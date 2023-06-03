import React, { useState } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Chart } from "react-google-charts";
import { TbBellRingingFilled } from "react-icons/tb";
import { MdNotificationsActive } from "react-icons/md";
import Notification from "../../components/Notification"


function Dashboard() {
    const [showModalNotification, setShowModalNotification] = useState(false);

    const chartOptions = {
        curveType: 'function',
        backgroundColor: 'none',
        chartArea: { width: '80%', height: '70%', border: { radius: 10 } },
        legend: 'none',
        vAxis: { minValue: 0 },
        dataOpacity: 1,
        pointSize: 8,
        lineWidth: 2,
        borderRadius: 8,
        vAxis: {
            gridlines: { color: '#131313' },
            textStyle: {
                color: '#fff', // Define a cor dos nomes no índice
            }
        },
        hAxis: {
            textStyle: {
                color: '#fff', // Define a cor dos nomes no índice
            }
        },
    };

    const chartData = [
        ['Ano', 'Amigos', { role: "style" }],
        ['D-7', 10, '#fff'],
        ['D-6', 20, '#fff'],
        ['D-5', 30, '#fff'],
        ['D-4', 40, '#fff'],
        ['D-3', 50, '#fff'],
        ['D-2', 60, '#fff'],
        ['D-1', 100, '#0f3'],
        ['D-0', 70, '#fff'],
    ];

    return (
        <>
            <div className="DashboardContainer">
                <Sidebar />
                <div className="DashboardNavegacao">
                    <div className="DashboardSuperior">
                        <span className="DashboardSpanMeusInsights">Meus Insights</span>
                        <MdNotificationsActive className="profileJogoIconNotificacao" onClick={() => setShowModalNotification(true)}/>
                    </div>
                    <div className="DashboardCenter">
                        <div className="DashboardContainerEsquerda DashboardTabela">
                            <div className="DashboardTableTittle">
                                <p className="DashboardTableTittlePrimeiro">
                                    Salas Recentes
                                </p>
                                <p className="DashboardTableTittleSegundo">
                                    Em que eu participei
                                </p>
                            </div>
                            <div className="DashboardTableItens">
                                <div className="DashboardTableCollum">
                                    <div className="DashboardTableName">
                                        <p>Nome</p>
                                        <p>Data</p>
                                        <p>Membros</p>
                                    </div>
                                    <hr width="100%" color="#000"/>
                                    <div className="DashboardTableData">
                                        <p>Cross Game</p>
                                        <p>03/02/2023</p>
                                        <p>06</p>
                                    </div>
                                    <hr width="100%" color="#000"/>
                                    <div className="DashboardTableData">
                                        <p>Cross Game</p>
                                        <p>03/02/2023</p>
                                        <p>06</p>
                                    </div>
                                    <hr width="100%" color="#000"/>
                                    <div className="DashboardTableData">
                                        <p>Cross Game</p>
                                        <p>03/02/2023</p>
                                        <p>06</p>
                                    </div>
                                    <hr width="100%" color="#000"/>
                                    <div className="DashboardTableData">
                                        <p>Cross Game</p>
                                        <p>03/02/2023</p>
                                        <p>06</p>
                                    </div>
                                    <hr width="100%" color="#000"/>
                                    <div className="DashboardTableData">
                                        <p>Cross Game</p>
                                        <p>03/02/2023</p>
                                        <p>06</p>
                                    </div>
                                    <hr width="100%" color="#000"/>
                                    <div className="DashboardTableData">
                                        <p>Cross Game</p>
                                        <p>03/02/2023</p>
                                        <p>06</p>
                                    </div>
                                    <hr width="100%" color="#000"/>
                                    <div className="DashboardTableData">
                                        <p>Cross Game</p>
                                        <p>03/02/2023</p>
                                        <p>06</p>
                                    </div>
                                    <hr width="100%" color="#000"/>
                                    <div className="DashboardTableData">
                                        <p>Cross Game</p>
                                        <p>03/02/2023</p>
                                        <p>06</p>
                                    </div>
                                    <hr width="100%" color="#000"/>
                                    <div className="DashboardTableData">
                                        <p>Cross Game</p>
                                        <p>03/02/2023</p>
                                        <p>06</p>
                                    </div>
                                    <hr width="100%" color="#000"/>
                                    <div className="DashboardTableData">
                                        <p>Cross Game</p>
                                        <p>03/02/2023</p>
                                        <p>06</p>
                                    </div>
                                    <hr width="100%" color="#000"/>
                                    <div className="DashboardTableData">
                                        <p>Cross Game</p>
                                        <p>03/02/2023</p>
                                        <p>06</p>
                                    </div>
                                    <hr width="100%" color="#000"/>
                                    <div className="DashboardTableData">
                                        <p>Cross Game</p>
                                        <p>03/02/2023</p>
                                        <p>06</p>
                                    </div>
                                    <hr width="100%" color="#000"/>
                                </div>
                            </div>
                        </div>
                        <div className="DashboardContainerEsquerda">
                            <div className="DashboardGrafico">
                                <p className="DashboardGraficoPrimeiro">Amizades Realizadas</p>
                                <p className="DashboardGraficoSegundo">Nos ultimos 8 dias</p>
                            </div>
                            <Chart
                                chartType="ColumnChart"
                                data={chartData}
                                options={chartOptions}
                                width="100%"
                                height="90%"
                                border="2px solid green"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            {showModalNotification && (
                <Notification onClose={() => setShowModalNotification(false)} />
            )}
        </>
    )


}

export default Dashboard;