#fake data generator: build real helios.tvr protobuf messages
#so frontend gets the same shape the real Helios data will have
import asyncio
import random
from datetime import datetime, timezone

import betterproto2

from app.generated.helios.tvr import (
    FlightState,
    ImuSample,
    NavState,
    Power,
    Quaternion,
    SystemStatus,
    TelemetryState,
    Vec3
)

SOURCE_ADDRESS = "tvr.fc" #placeholder until have real address

def to_data(message: betterproto2.Message) -> dict: 
    #message -> bytes -> message -> dict
    decoded = type(message).parse(bytes(message))
    return decoded.to_dict(casing=betterproto2.Casing.SNAKE, include_default_values=True)

#shape: type, source_address, event_name, timestamp, data 
def make_event(event_id: int, event_name: str, message: betterproto2.Message) -> dict:
    #wrap one sensor reading in the same shape as helios event 
    return {
        "type": "event",
        "id": event_id,
        "event_name": event_name, 
        "source_address": SOURCE_ADDRESS,
        "timestamp": datetime.now(timezone.utc).isoformat(timespec="milliseconds"),
        "data": to_data(message),
    }

def noisy_vec3(x: float, y: float, z: float, sigma: float) -> Vec3:
    #(x,y,z) with random noise on each axis
    return Vec3(
        x = x + random.gauss(0, sigma),
        y = y + random.gauss(0, sigma),
        z = z + random.gauss(0, sigma),
    )

async def fake_data_stream(delay: float = 0.1): 
    #one telemetry event every 0.1s (10 Hz), plus a system_status event every 10th tick (1 Hz)
    yield {"type": "status", "helios": "connected"}
    event_id = 0
    seq = 0
    battery_v = 12.6 #full battery, drains a little every loop
    loop = asyncio.get_running_loop()
    start = loop.time()

    while True:
        timestamp_ms = int((loop.time() - start) * 1000)  #since boot
        battery_v -= 0.001

        telemetry = TelemetryState(
            timestamp_ms=timestamp_ms,
            seq=seq,
            flight_state=FlightState.HOVER,
            nav=NavState(
                position=noisy_vec3(0.0, 0.0, 1.5, 0.02), #hovering 1.5 m up
                velocity=noisy_vec3(0.0, 0.0, 0.0, 0.05),
                attitude=Quaternion(w=1.0, x=0.0, y=0.0, z=0.0), #level
                angular_rate=noisy_vec3(0.0, 0.0, 0.0, 0.01),
            ),
            imu=[
                ImuSample(
                    sensor_id=0,
                    dt_us=0,
                    accel=noisy_vec3(0.0, 0.0, -9.81, 0.02),
                    gyro=noisy_vec3(0.0, 0.0, 0.0, 0.1),
                )
            ],
            power=Power(
                battery_v=battery_v + random.gauss(0, 0.005),
                current_a=0.5 + random.gauss(0, 0.02),
            ),
            #guidance, control, actuators, motors, uwb unset
        )
        event_id += 1
        yield make_event(event_id, "telemetry", telemetry)

        if seq % 10 == 0: #1 Hz
            status = SystemStatus(
                timestamp_ms=timestamp_ms,
                uptime_ms=timestamp_ms,
                flight_state=FlightState.HOVER,
                accel_ok=True,
                gyro_ok=True,
                radio_tx_count=seq,
                radio_rx_count=0,
                cmd_rx_count=0,
            )
            event_id += 1
            yield make_event(event_id, "system_status", status)

        seq += 1
        await asyncio.sleep(delay)

