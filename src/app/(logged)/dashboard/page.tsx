'use client';
import React, {useRef, useState} from 'react';
import {Layout, Button, FloatButton, Modal, List, Statistic, StatisticProps, Card, Table, TourProps, Tour} from 'antd';
import {BsQrCodeScan} from 'react-icons/bs';
import {Scanner} from '@yudiel/react-qr-scanner';
import {ScanNewParticipant} from '@/components/modals/ScanNewParticipant';
import {Person} from '@/types/person';
import CountUp from 'react-countup';
import {PiSmileyLight} from 'react-icons/pi';
import {FaFileExport} from 'react-icons/fa6';

const {Header, Content, Footer} = Layout;

const Dashboard = () => {

    const [newScan, setNewScan] = useState<boolean>(false)
    const [scannedParticipants, setScannedParticipants] = useState<Person[]>([]);


    const handleNewScan = (newParticipants: Person[]) => {
        newParticipants.forEach((participant) => {
            if (scannedParticipants.find((p) => p.email === participant.email)) return;
            setScannedParticipants([...scannedParticipants, participant])
        })
    };


    const exportAttendees = () => {

    }

    return (
        <Layout className="min-h-screen">
            <Header>
                <span className={'text-white'}>CloudNord 2024</span>
                <span className={'text-white float-right'}>TECHSYS</span>

            </Header>

            <Content className="flex flex-col justify-center p-4">

                {/*<div className={'flew flex-row '}>*/}
                {/*    <Card className={'w-1/2'}>*/}
                {/*        <Statistic title="Matched Users" value={20} formatter={formatter}/>*/}
                {/*    </Card>*/}
                {/*</div>*/}

                <Card title={"Participants"}>
                    <Table

                        columns={[
                            {
                                title: 'Nom',
                                dataIndex: 'name',
                                key: 'name',
                                filterMode: 'tree',
                                filterSearch: true
                            },
                            {
                                title: 'Prénom',
                                dataIndex: 'firstName',
                                key: 'firstName',
                            },
                            {
                                title: 'Email',
                                dataIndex: 'email',
                                key: 'email',
                            }
                        ]}
                        dataSource={scannedParticipants}
                        locale={{
                            emptyText: (
                                <center>
                                    <PiSmileyLight size={'4em'}/><br/>
                                    {'Vous n\'avez pas encore scanné de participant.'}
                                </center>
                            )
                        }}

                    />

                    <Button onClick={exportAttendees} type={"link"} icon={<FaFileExport />}>Exporter au format CSV</Button>
                </Card>


                <FloatButton
                    style={{
                        width: '80px',
                        height: '80px',
                    }}
                    type={'primary'}
                    onClick={() => setNewScan(true)}
                    icon={<BsQrCodeScan className={'w-full'}/>}/>

                <Modal
                    open={newScan}
                    onCancel={() => setNewScan(false)}
                    title={'Scan New Participants'}
                    destroyOnClose
                    maskClosable={false}
                    footer={[
                        <Button key="back" onClick={() => setNewScan(false)}>
                            Close
                        </Button>
                    ]}
                >
                    <ScanNewParticipant onNewScan={handleNewScan}/>
                </Modal>


            </Content>

        </Layout>
    );
};

export default Dashboard;