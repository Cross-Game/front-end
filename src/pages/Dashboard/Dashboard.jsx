import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Chart } from "react-google-charts";
import { MdNotificationsActive } from "react-icons/md";
import Notification from "../../components/Notification/index"
import axios from "axios";
import { currentURL } from "../../data/constants";


function Dashboard() {
    const [showModalNotification, setShowModalNotification] = useState(false);
    const [salasRecentes, setSalasRecentes] = useState()
    const [dadosGrafico, setDadosGrafico] = useState([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ])

    const today = new Date();
    const eightDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dateRange = [];
    for (let i = 0; i < 8; i++) {
        const currentDate = new Date(eightDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
        const formattedDate = currentDate.toISOString().split('T')[0];
        dateRange.push(formattedDate);
    }

    useEffect(() => {

        const config = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("ACESS_TOKEN")
            }
        };
        axios.get(`${currentURL}/friends/${sessionStorage.getItem("ID")}`, config)
            .then(response => {
                var contador = 0;
                for (let j = 0; j < dateRange.length; j++) {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].friendshipStartDate === dateRange[j]) {
                            contador++;
                            setDadosGrafico(prevState => {
                                const novoArray = [...prevState];
                                novoArray[j] = contador;
                                return novoArray;
                            });
                        }
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });
        axios.get(`${currentURL}/team-rooms`).then((response) => {
            setSalasRecentes(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.error(error);
        });
    }, []);

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
        ['D-7', dadosGrafico[0], '#fff'],
        ['D-6', dadosGrafico[1], '#fff'],
        ['D-5', dadosGrafico[2], '#fff'],
        ['D-4', dadosGrafico[3], '#fff'],
        ['D-3', dadosGrafico[4], '#fff'],
        ['D-2', dadosGrafico[5], '#fff'],
        ['D-1', dadosGrafico[6], '#0f3'],
        ['D-0', dadosGrafico[7], '#fff'],
    ];


    return (
        <>
            <div className="DashboardContainer">
                <Sidebar />
                <div className="DashboardNavegacao">
                    <div className="DashboardSuperior">
                        <span className="DashboardSpanMeusInsights">Meus Insights</span>
                        <MdNotificationsActive className="profileJogoIconNotificacao" onClick={() => setShowModalNotification(true)} />
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
                                        <p>Jogo</p>
                                        <p>Membros</p>
                                    </div>
                                    <hr width="100%" color="#000" />
                                    {salasRecentes && salasRecentes.map((salas, index) => (
                                        <div className="DashboardTableCollum" key={index}>
                                            <div className="DashboardTableData">
                                                <p>{salas.name}</p>
                                                <p>{salas.gameName}</p>
                                                <p>{salas.capacity}</p>
                                            </div>
                                            <hr width="100%" color="#000" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="DashboardTableArquivo ">
                                <div class="uiverse">
                                    <span class="tooltip">Baixe um exemplo de arquivo de Upload</span>
                                    Exemplo de Arquivo
                                </div>
                                <div class="uiverse">
                                    <span class="tooltip">Faça upload do arquivo igual ao de exemplo</span>
                                    Upload Arquivo
                                </div>
                                <div class="uiverse">
                                    <span class="tooltip">Faça download das salas recentes</span>
                                    Download Arquivo
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