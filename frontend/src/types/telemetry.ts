//describe the messages
//ts types for messages the backend sends over /ws 
//field names match helios-protos/tvr/*.proto (snake_case, same as the backend's to_dict)
//message field or `optional` in the proto → can be null, `repeated` → array

// --- tvr/common.proto ---
export interface Vec2 { x: number; y: number } 
export interface Vec3 { x: number; y: number; z: number } 
export interface Quaternion { w:number; x: number; y: number; z: number } 

//a string union, not TS enum
export type FlightState =
    | 'FLIGHT_STATE_IDLE'
    | 'FLIGHT_STATE_ESTOP'
    | 'FLIGHT_STATE_RISE'
    | 'FLIGHT_STATE_HOVER'
    | 'FLIGHT_STATE_LOWER'
    | 'FLIGHT_STATE_ARMED'
    | 'FLIGHT_STATE_LANDED';

// --- tvr/telemetry.proto ---
export interface NavState {
    position: Vec3 | null;
    velocity: Vec3 | null;
    attitude: Quaternion | null;
    angular_rate: Vec3 | null;
    pos_variance: number | null;
    vel_variance: number | null;
}

export interface ImuSample {
    sensor_id: number;
    dt_us: number;
    accel: Vec3 | null; 
    gyro: Vec3 | null;
}

export interface Guidance { 
    position_sp: Vec3 | null;
    velocity_sp: Vec3 | null; 
    attitude_sp: Quaternion | null; 
    waypoint_index: number | null 
}

export interface ControlOutput {
    thrust_cmd: number | null; 
    gimbal_cmd: Vec2 | null;
}

export interface Actuator {
    id: number; 
    commanded: number | null;
    measured: number | null;
}

export interface Motor {
    id: number; 
    rpm: number | null; 
    voltage: number | null; 
    current: number | null; 
    temp_c: number | null; 
}

export interface UwbTag {
    id: number; 
    position: Vec3 | null; 
    anchor_ranges: number[];
}

export interface Power {
    battery_v: number | null; 
    current_a: number | null;
}

export interface TelemetryState {
    timestamp_ms: number;
    seq: number; 
    flight_state: FlightState;
    nav: NavState | null;
    imu: ImuSample[];
    guidance: Guidance | null;
    control: ControlOutput | null;
    actuators: Actuator[];
    motors: Motor[];
    uwb: UwbTag[];
    power: Power | null;
}

// --- tvr/status.proto ---
export interface SystemStatus {
    timestamp_ms: number;
    uptime_ms: number;
    flight_state: FlightState;
    accel_ok: boolean;
    gyro_ok: boolean;
    radio_tx_count: number;
    radio_rx_count: number;
    cmd_rx_count: number;
}

// --- what the backend wraps around each message (make_event in fake.py) ---
interface EventBase {
    type: 'event';
    id: number;
    source_address: string;
    timestamp: string; //ISO time, e.g. "2026-11-22T20:15:03.120+00:00"
}

export interface TelemetryEvent extends EventBase {
    event_name: 'telemetry';
    data: TelemetryState;
}

export interface SystemStatusEvent extends EventBase {
    event_name: 'system_status';
    data: SystemStatus;
}

//the backend's own connection status, not the drone's SystemStatus
export interface ConnectionStatus {
    type: 'status';
    helios: 'connected' | 'disconnected';
}

//everything that can arrive on /ws
export type ServerMessage = TelemetryEvent | SystemStatusEvent | ConnectionStatus;
