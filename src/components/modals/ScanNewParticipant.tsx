import {IDetectedBarcode, Scanner, useDevices} from '@yudiel/react-qr-scanner';
import React, {useState} from 'react';
import {notification, Select, Tag} from 'antd';
import {Person} from '@/types/person';


export interface ScanNewParticipantProps {
    onNewScan: (newParticipants: Person[]) => void;
}


export const ScanNewParticipant = ({onNewScan}: ScanNewParticipantProps) => {
    const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
    const devices = useDevices();

    const SCANS_LIMIT = 4;
    const [scanned, setScanned] = useState<Person[]>([])
    const [detectedCodes, setDetectedCodes] = useState<string[]>([])

    const addNewScan = (person: Person) => {
        if (scanned.length >= SCANS_LIMIT) {
            scanned.shift();
        }

        setScanned([...scanned, person]);
        onNewScan([...scanned, person]);
        notification.success({
            placement: "bottom",
            message: person.firstName + ' ' + person.name,
            duration:1
        })
    }


    const detectScan = (result: IDetectedBarcode[]) => {
        result.forEach((barcode) => {
            if (detectedCodes.includes(barcode.rawValue)) return;
            setDetectedCodes([...detectedCodes, barcode.rawValue])

            addNewScan({
                name: barcode.format,
                firstName: barcode.rawValue,
                email: barcode.rawValue
            })

        })
    }

    return (
        <div
            className={'min-h-96 flex flex-col items-center'}>

            <Select
                placeholder={'Select a device'}
                options={devices.map((device) => ({label: device.label, value: device.deviceId}))}
                onChange={(value) => setDeviceId(value)}
            />

            <Scanner
                onScan={detectScan}
                constraints={{
                    deviceId: deviceId
                }}
                formats={[
                    'qr_code',
                    'micro_qr_code',
                    'rm_qr_code'
                ]}
                allowMultiple={false}
                scanDelay={2000}
                styles={{
                    container: {
                        // border: '10px solid blue',
                    },
                    video: {
                        border: '5px solid bl',
                    },

                }}
                components={{
                    audio: true,
                }}

            />

            <div className={'mt-2 text-left w-full'}>
                Last scans:
                {scanned.length === 0 && <span className={'font-bold'}>None</span>}
                {scanned.map((person) => (<Tag>{person.firstName + ' ' + person.name}</Tag>))}
            </div>
        </div>
    )
}