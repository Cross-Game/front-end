import React, { useEffect, useState } from 'react';
import './Rooms.css'
import Sidebar from '../../components/Sidebar/Sidebar';
import CardRoom from '../../components/CardRoom/CardRoom';
import axios from "axios"
import Modal from '../../components/Modal';
import { MdGroups } from 'react-icons/md';
import { BsArrowLeftShort, BsArrowRightShort, BsFillCalendarWeekFill, BsFilterLeft, BsPlus } from 'react-icons/bs';
import Tag from '../../components/Tag';
import RangeBar from '../../components/RangeBar';
import { HiMinusSm } from 'react-icons/hi';
// import { useHistory } from 'react-router-dom';
// import { use } from 'react-router-dom';
import { jogos as listaJogos } from "../../utils/jogos";
import moment from 'moment';
import { TOKEN, USERID } from '../../data/constants';
import Button from '../../components/Button';
import { Navigate, useNavigate } from 'react-router-dom';

function Rooms() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [jogos, setJogos] = useState(listaJogos);
    const [meusJogos, setMeusJogos] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8081/team-rooms');
                setRooms(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);


    // [MODAL] CRIAR SALA
    const [showModalCriarSala, setShowModalCriarSala] = useState(false);

    const [jogoSelecionado, setJogoSelecionado] = useState("");
    const [rankSelecionado, setRankSelecionado] = useState("");
    var [qtdJogadoresSelecionados, setQtdJogadoresSelecionados] = useState(5);
    const [horarioSelecionado, setHorarioSelecionado] = useState("______________________");
    const [descricaoSalaCriar, setDescricaoSalaCriar] = useState("");
    var [minLevel, setMinLevel] = useState(1);
    var [maxLevel, setMaxLevel] = useState(100);
    const [nomeSalaCriar, setNomeSalaCriar] = useState("")

    function limparModalCriarSala() {
        console.log("Limpando Modal Criar Sala");
        setQtdJogadoresSelecionados(5);
        setJogoSelecionado("");
        setRankSelecionado("");
        setDescricaoSalaCriar("");
        setNomeSalaCriar("");
        console.log(minLevel);
        console.log(maxLevel);
        setMinLevel(1);
        setMaxLevel(100);
    }

    const [currentValues, setCurrentValues] = useState({ min: minLevel, max: maxLevel });
    useEffect(() => {
        setCurrentValues({ min: minLevel, max: maxLevel });
    }, [minLevel, maxLevel]);
    const handleValuesChange = (newValues) => {
        setMinLevel(newValues.min);
        setMaxLevel(newValues.max);
    };

    function handleInputFocus(e) {
        const label = e.target.parentNode;
        label.classList.add('salas-whiteText');
    }
    function handleInputBlur(e) {
        const label = e.target.parentNode;
        label.classList.remove('salas-whiteText');
    }

    const [currentDayNow, setCurrentDayNow] = useState(moment().format("DD"));
    const [currentMonthNow, setCurrentMonthNow] = useState(moment().format("MM"));
    const [currentHourNow, setCurrentHourNow] = useState(moment().format("HH"));
    const [currentMinuteNow, setCurrentMinuteNow] = useState(moment().format("mm"));

    const [selectedDay, setSelectedDay] = useState(currentDayNow);
    const [selectedHour, setSelectedHour] = useState(currentHourNow);
    const [selectedMinute, setSelectedMinute] = useState(currentMinuteNow);
    const [selectedMonth, setSelectedMonth] = useState(currentMinuteNow);

    const handleSelectedDayChange = (day) => {
        setSelectedDay(day.toString().padStart(2, '0'));
        if (parseInt(day) < parseInt(currentDayNow)) {
            setSelectedMonth((parseInt(currentMonthNow) + 1).toString().padStart(2, '0'));
        } else {
            setSelectedMonth(currentMonthNow.toString().padStart(2, '0'));
        }
    };

    const handleSelectedHourChange = (hour) => {
        setSelectedHour(hour.toString().padStart(2, '0'));
    };

    const handleSelectedMinuteChange = (minute) => {
        setSelectedMinute(minute.toString().padStart(2, '0'));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment();
            setCurrentDayNow(now.format("DD"));
            setCurrentMonthNow(now.format("MM"));
            setCurrentHourNow(now.format("HH"));
            setCurrentMinuteNow(now.format("mm"));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // [MODAL Calendario]
    const [showModalCalendario, setShowModalCalendario] = useState(false);
    function agendarSala() {
        const horario = `${selectedHour}:${selectedMinute} de ${selectedDay}/${selectedMonth}`;
        setHorarioSelecionado(horario);
    }

    // [Modal] Filtro de Salas
    const [showModalFiltroSala, setShowModalFiltroSala] = useState(false);

    useEffect(() => {
        const obterMeusJogos = async () => {
            try {
                console.log("Chamei obterMeusJogos");
                const response = await axios.get(
                    `http://localhost:8080/user-games/${USERID}`,
                    {
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${TOKEN}`
                        },
                    }
                );
                if (response.status === 200) {
                    console.log(response);
                    response.data.map((jogo) => {
                        switch (jogo.gameId) {
                            case 1: break;
                            case 2: break;
                            case 3: break;
                        }
                    })
                    setMeusJogos(response.data)
                }
                else if (response.status === 204) {
                    console.log("Sem jogos cadastrados")
                }
                else {
                    console.error("Erro ao obter meus jogos", response.status);
                    // mudarToast("erro", "Erro ao cadastrar plataformas");
                }
            } catch (error) {
                console.error("Erro ao obter meus jogos:", error);
            }
        };

        obterMeusJogos();
    }, []); // Sem dependências

    const criarSala = async () => {
        try {
            console.log("Chamei criar sala");
            const response = await axios.post(
                `http://localhost:8080/team-rooms`,
                {

                    roomName: nomeSalaCriar.toString(),
                    capacity: qtdJogadoresSelecionados,
                    gameName: jogoSelecionado.toString(),
                    rankGame: rankSelecionado.toString(),
                    levelGame: minLevel,
                    description: descricaoSalaCriar.toString(),
                    private: false,
                    tokenAccess: ""
                },
                {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`
                    },
                }
            );

            if (response.status === 200) {
                console.log(response);
            }
            else if (response.status === 204) {
                console.log("Erro ao criar sala")
            }
            else {
                console.error("Erro ao criar sala", response.status);
                // mudarToast("erro", "Erro ao cadastrar plataformas");
            }
        } catch (error) {
            console.error("Erro ao criar sala", error);
        }
    };

    return (
        <>
            <div className='containerRooms'>
                <Sidebar />
                <div className='bodyRooms'>
                    <div className="topDiv">
                        <div className="inputDiv">
                            <input type="text" className='inputRooms' placeholder='Buscar salas' />
                        </div>
                        <div className="divRoomsAllContainer">
                            {rooms == [] || rooms.length == 0 || null || undefined ?

                                <NothingContentRooms
                                    text1={"Não temos nenhuma sala pública"}
                                    text2={"Seja o primeiro a criar"}
                                    isInteractive={true}
                                />

                                : rooms.map((element) => (
                                    <React.Fragment key={element.id}>
                                        <CardRoom nomeEquipe={element.roomName} faltantes={element.capacity} gameName={element.gameName} rankGame={element.rankGame} levelGame={element.levelGame} descricao={element.description} isClick={false} idGroup={element.id} />
                                    </React.Fragment>
                                ))}
                        </div>
                    </div>
                    <div className="bottomDiv">
                        <div className="inputDiv">
                            <input type="text" className='inputRooms' placeholder='Buscar salas' />
                            <div className='divButtonCriarSala' onClick={() => setShowModalCriarSala(true)}>
                                Criar sala
                            </div>
                            <div className="divButtonBuscaRapida">
                                Busca rápida
                            </div>
                        </div>
                        <div className="divRoomsAllContainer">
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                        </div>
                    </div>
                </div>
            </div>


            {showModalCriarSala && (
                <Modal title="Criar uma sala" icon={<MdGroups />} clearAll={true} temFooter={true} ativarBotao={true} iconButton={<BsArrowRightShort />} textButton='Criar' onClose={() => setShowModalCriarSala(false)} onClear={limparModalCriarSala} onClickButton={criarSala}>
                    {meusJogos.length <= 0 ? (
                        <div className='salas-containerSemJogo'>
                            <p>Para continuar é necessário cadastrar 1 jogo.</p>
                            <Button text={"Cadastrar jogo"} icon={<BsArrowRightShort />} onClick={() => navigate("/profile")} />
                        </div>
                    ) : (
                        <div className="container_filtro">
                            <div className="filtro_jogos">
                                <p className="titleFiltro">Escolha um Jogo</p>
                                <div className="jogos">
                                    {jogos.map((jogo) => (
                                        <React.Fragment key={jogo.id}>
                                            <Tag
                                                text={jogo.nome}
                                                isSelected={jogoSelecionado === jogo.nome ? true : false}
                                                onClick={() => setJogoSelecionado(jogo.nome)} />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            <div className="filtro_level">
                                <p className="titleFiltro">Level</p>
                                <RangeBar min={1} max={100} values={currentValues} onChange={handleValuesChange} />
                            </div>

                            <div className="filtro_qtdPlayers">
                                <p className="titleFiltro">Qtd de Players</p>
                                <div className="container_input_qtd">
                                    <input type="text" value={qtdJogadoresSelecionados} className="input_qtd_players"></input>
                                    <div className="container_valor">
                                        <HiMinusSm className="valor" onClick={() => {
                                            if (qtdJogadoresSelecionados > 2) {
                                                setQtdJogadoresSelecionados(qtdJogadoresSelecionados - 1);
                                            }
                                        }} />
                                        <BsPlus className="valor" onClick={() => {
                                            if (qtdJogadoresSelecionados < 10) {
                                                setQtdJogadoresSelecionados(qtdJogadoresSelecionados + 1);
                                            }
                                        }} />
                                    </div>
                                </div>
                            </div>


                            <div className="filtro_rank" >
                                <p className="titleFiltro">Rank</p>
                                {jogos &&
                                    jogos.find((jogo) => jogo.nome === jogoSelecionado)?.rank.map((rank, index) => (
                                        <React.Fragment key={rank}>
                                            <br />
                                            <Tag
                                                text={rank}
                                                isSelected={rankSelecionado === rank ? true : false}
                                                onClick={() => setRankSelecionado(rank)}
                                            />
                                        </React.Fragment>
                                    ))}
                            </div>

                            <div className="filtro_descricao">
                                <p className="titleFiltro">Nome da sala</p>
                                <textarea
                                    className="my-textarea"
                                    value={nomeSalaCriar}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 20) {
                                            setNomeSalaCriar(e.target.value);
                                        }
                                    }}
                                ></textarea>
                            </div>

                            <div className="filtro_descricao">
                                <p className="titleFiltro">Descrição</p>
                                <textarea
                                    className="my-textarea"
                                    value={descricaoSalaCriar}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 90) {
                                            setDescricaoSalaCriar(e.target.value);
                                        }
                                    }}
                                ></textarea>
                            </div>

                            {/* <div className="filtro_horario">
                            <form>
                                <p className="titleFiltro">Quando?</p>
                                <label><input type="radio" name='quando' value='agora' onFocus={handleInputFocus} onBlur={handleInputBlur} checked /> Agora</label>
                                <div className="salas-group-inputRadio">
                                    <label><input type="radio" name='quando' value='agendado' onFocus={handleInputFocus} onBlur={handleInputBlur} /> Apartir das <span>{horarioSelecionado}</span> <BsFillCalendarWeekFill className="iconCalendario" onClick={() => setShowModalCalendario(true)} /></label>
                                </div>
                            </form>
                        </div> */}
                        </div>
                    )}
                </Modal>
            )}

            {showModalCalendario && (

                <Modal onClose={() => setShowModalCalendario(false)} title='Agendar partida' icon={<BsFillCalendarWeekFill />} clearAll='true' temFooter='true' ativarBotao='true' iconButton={<BsArrowRightShort />} textButton='Agendar' onClickButton={() => agendarSala()}>
                    <div className="salas-groupCalendario">
                        Dia
                        {currentDayNow && <NumberList min={1} max={31} step={1} initialValue={parseInt(currentDayNow)} onSelectedNumberChange={handleSelectedDayChange} />}
                        Hora
                        {currentHourNow && <NumberList min={0} max={23} step={1} initialValue={parseInt(currentHourNow)} onSelectedNumberChange={handleSelectedHourChange} />}
                        Minutos
                        {currentMinuteNow && <NumberList min={0} max={55} step={5} initialValue={Math.ceil(currentMinuteNow / 5) * 5} onSelectedNumberChange={handleSelectedMinuteChange} />}
                    </div>
                </Modal>
            )}

            {showModalFiltroSala && (
                <Modal title="Filtrar por" icon={<BsFilterLeft />} clearAll='true' temFooter='true' ativarBotao='true' iconButton={<BsArrowRightShort />} textButton='Filtrar'>
                    <div className="container_filtro">

                        <div className="filtro_jogos">
                            <p className="titleFiltro">Meus Jogos</p>
                            <div className="jogos">
                                {jogos.map((jogo) => (
                                    <React.Fragment key={jogo.id}>
                                        <Tag
                                            text={jogo.nome}
                                            isSelected={jogoSelecionado === jogo.nome ? true : false}
                                            onClick={() => setJogoSelecionado(jogo.nome)} />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="filtro_level">
                            <p className="titleFiltro">Level</p>
                            <RangeBar min={1} max={100} values={currentValues} onChange={handleValuesChange} />
                        </div>

                        <div className="filtro_rank">
                            <p className="titleFiltro">Rank</p>
                            {jogos &&
                                jogos.find((jogo) => jogo.nome === jogoSelecionado)?.rank.map((rank, index) => (
                                    <React.Fragment key={rank}>
                                        <br />
                                        <Tag
                                            text={rank}
                                            isSelected={rankSelecionado === rank ? true : false}
                                            onClick={() => setRankSelecionado(rank)}
                                        />
                                    </React.Fragment>
                                ))}
                        </div>

                    </div>
                </Modal>
            )}
        </>
    );
}


export const NothingContentRooms = (props) => {
    return (
        <>
            <div className='nothingContentRooms'>
                <h1 className='nothingContentRoomsH1'>{props.text1} </h1>
                <p className='nothingContentRoomsP'>{props.text2}</p>
                {props.isInteractive && <div className='divButtonCriarSala'>
                    Criar sala
                </div>}
            </div>
        </>
    )
}

const NumberList = ({ min, max, step, initialValue, onSelectedNumberChange }) => {
    const [selectedNumber, setSelectedNumber] = useState(initialValue || min);
    const [currentNumber, setCurrentNumber] = useState(initialValue || min);

    const handleNextClick = () => {
        const nextNumber = currentNumber + step;
        if (nextNumber > max) {
            setCurrentNumber(min);
            setSelectedNumber(min);
        } else {
            setCurrentNumber(nextNumber);
        }
    };

    const handlePrevClick = () => {
        const prevNumber = currentNumber - step;
        if (prevNumber < min) {
            setCurrentNumber(max - step + 1);
            setSelectedNumber(max);
        } else {
            setCurrentNumber(prevNumber);
        }
    };

    const numbers = [];
    for (let i = 0; i < 6; i++) {
        const number = currentNumber + i * step;
        if (number > max) {
            numbers.push(number - max + min - 1);
        } else {
            numbers.push(number);
        }
    }

    const handleNumberSelect = (number) => {
        setSelectedNumber(number);
        onSelectedNumberChange(number); // Chamada da função de callback
    };

    return (
        <div className="numberList">
            <BsArrowLeftShort onClick={handlePrevClick} className="numberList-seta" size={'40px'} />
            {numbers.map((number) => (
                <span
                    key={number}
                    className={selectedNumber === number ? "salas-spanNumber-selected" : "salas-spanNumber"}
                    onClick={() => handleNumberSelect(number)}
                >
                    {number}
                </span>
            ))}
            <BsArrowRightShort onClick={handleNextClick} className="numberList-seta" size={'40px'} />
        </div>
    );
};

export default Rooms;