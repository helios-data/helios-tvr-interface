#fake data generator 
import asyncio
import random
from datetime import datetime, timezone

#shape: type, source_address, event_name, timestamp, data 
def make_event(event_id: int, event_name: str, data: dict) -> dict:
    #wrap one sensor reading in the same shape as helios event 
    return {
        "type": "event",
        "id": event_id,
        "event_name": event_name, 
        "source_address": f"tvr.{event_name}",
        "timestamp": datetime.now(timezone.utc).isoformat(timespec="milliseconds"),
        "data": data,
    }

async def fake_data_stream(delay: float = 0.1): 
    #yield one fake data dictionary per cycle 
    yield {"type": "status", "helios": "connected"}
    event_id = 0
    battery_v = 12.6 #full battery, drains a little every loop 

    while True: 
        battery_v -= 0.05
        readings = {
            "imu": {
               "accel_x": round(random.gauss(0, 0.02), 3),
               "accel_y": round(random.gauss(0, 0.02), 3),
               "accel_z": round(-9.81 + random.gauss(0, 0.02), 3),
               "gyro_x": round(random.gauss(0, 0.1), 3),
               "gyro_y": round(random.gauss(0, 0.1), 3),
               "gyro_z": round(random.gauss(0, 0.1), 3),
            }, 
            "baro": {
                "pressure_kpa": round(101.3 + random.gauss(0, 0.02), 3),
                "altitude_m": round(random.gauss(0, 0.1), 2),
                "temperature_c": round(round(random.gauss(0, 0.05), 2),)
            }, 
            "battery": {
                "voltage_v": round(battery_v + random.gauss(0.005), 3), 
                "current_a": round(0.5 + random.gauss(0, 0.02), 3)
            },
        }

        for event_name, data in readings.items(): 
            event_id += 1
            yield make_event(event_id, event_name, data)
    
        event_id += 1
        await asyncio.sleep(delay)

