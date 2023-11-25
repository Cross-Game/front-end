import React, { useEffect, useState } from 'react';
import './Rooms.css'
import Sidebar from '../../components/Sidebar/Sidebar';
import CardRoom from '../../components/CardRoom/CardRoom';
import axios from "axios"
import { currentURL } from '../../data/constants';
import Modal from '../../components/Modal';
import { MdGroups } from 'react-icons/md';
import { BsArrowLeftShort, BsArrowRightShort, BsFillCalendarWeekFill, BsFilterLeft, BsImage, BsPlus } from 'react-icons/bs';
import Tag from '../../components/Tag';
import RangeBar from '../../components/RangeBar';
import { HiMinusSm, HiSearch } from 'react-icons/hi';
import moment from 'moment';
import { TOKEN, USERID } from '../../data/constants';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';

import { getJogadorImagem } from '../../utils/getJogadorImagem'
import { imageListClasses } from '@mui/material';

function Rooms() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [jogos, setJogos] = useState([]);
    const [meusJogos, setMeusJogos] = useState([])
    const [roomsFiltered, setRoomsFiltered] = useState([]);
    const [filterAplicado, setfilteAplicado] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${currentURL}/team-rooms`);
                setRooms(res.data);
                setRoomsFiltered(res.data)
                setIsLoading(false);
                console.log("Teste", res.data)
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [setRoomsFiltered, setRooms]);





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
        setQtdJogadoresSelecionados(5);
        setJogoSelecionado("");
        setRankSelecionado("");
        setDescricaoSalaCriar("");
        setNomeSalaCriar("");
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

    function limparFiltroSalas() {
        setJogoSelecionado("");
        setRankSelecionado("");
        setMinLevel(1);
        setMaxLevel(100);
    }

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('erro');


    function mudarToast(tipo, mensagem) {
        setShowToast(true);
        setToastType(tipo.toLowerCase());
        setToastMessage(mensagem);
    }



    function filtrarSalas() {

        setfilteAplicado(true);
        var encontrei = 0;
        setRoomsFiltered(rooms);
        const salasFiltradas = rooms.filter((sala) => {
            if (!jogoSelecionado || sala.gameName === jogoSelecionado) {
                console.log("Devolvendo true")
                encontrei++;
                return true;
            }
            return false;
        });
        console.log(salasFiltradas)
        console.log(salasFiltradas.lenght)
        if (encontrei != 0) {
            mudarToast("sucesso", "Filtro aplicado")
            setRoomsFiltered(salasFiltradas);
        }
        else {
            mudarToast("erro", "Nenhuma sala encontrada")
            setRoomsFiltered(salasFiltradas);
        }
        setShowModalFiltroSala(false)
    }

    function filtrarSalasPorNome(nomeSala) {
        setfilteAplicado(true);
        var encontrei = 0;
        setRoomsFiltered(rooms);
        const salasFiltradas = rooms.filter((sala) => {
            console.log(nomeSala)
            if (sala.name.startsWith(nomeSala)) {
                console.log("Devolvendo true")
                encontrei++;
                return true;
            }
            return false;
        });
        setRoomsFiltered(salasFiltradas);
        setShowModalFiltroSala(false)
    }

    useEffect(() => {
        const obterMeusJogos = async () => {
            try {
                const response = await axios.get(
                    `${currentURL}/user-games/${USERID}/games`,
                    {
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${TOKEN}`
                        },
                    }
                );
                if (response.status === 200) {
                    console.log(jogos)
                    const idsDesejados = response.data.map((jogo) => jogo.gameId);
                    const jogosFiltrados = jogos.filter((jogo) => idsDesejados.includes(jogo.id));
                    setMeusJogos(jogosFiltrados);
                    setJogos(response.data);
                }
                else if (response.status === 204) {
                }
                else {
                    console.error("Erro ao obter meus jogos", response.status);

                }
            } catch (error) {
                console.error("Erro ao obter meus jogos:", error);
            }
        };

        obterMeusJogos();
    }, []);

    const criarSala = async () => {
        try {
            console.log("Chamei criar sala");
            const response = await axios.post(
                `${currentURL}/team-rooms/${USERID}`,
                {

                    roomName: nomeSalaCriar.toString(),
                    capacity: 10,
                    gameName: jogoSelecionado.toString(),
                    rankGame: null,
                    levelGame: 0,
                    description: descricaoSalaCriar.toString(),
                    isPrivate: false,
                    tokenAccess: "",
                    idUserAdmin: parseInt(sessionStorage.getItem("ID"), 10),
                    usersInRoom: [],
                    usersHistoryId: [],
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
                mudarToast("sucesso", "Sala criada!");
                window.location.href = `/rooms/${response.data.id}`
            }
            else if (response.status === 201) {
                mudarToast("sucesso", "Sala criada!");
                window.location.href = `/rooms/${response.data.id}`
            }
            else {
                mudarToast("erro", "Erro ao criar sala");
            }
        } catch (error) {
            mudarToast("erro", "Erro ao criar sala");
        }
    };



    const [gamesApi, setGamesApi] = useState([]);
    const [idGameSelecionado, setIdGameSelecionado] = useState();


    useEffect(() => {
        console.log("retrieve information games");
        axios.get(
            `${currentURL}/games-api/`
        ).then(response => {
            if (response.status === 200) {
                // mudarToast("sucesso", "Sala criada!");
                console.log("Buscado jogos da api", response.data);
                setGamesApi(response.data)
                setJogos(response.data)
            }
        }).catch(error =>
            mudarToast("erro", "ao buscar jogos")

        )

    }, [])


    return (
        <>
            <div className='containerRooms'>
                <Sidebar />
                <div className='bodyRooms'>
                    <div className="topDiv">
                        <div className="inputDiv">
                            <input type="text" className='inputRooms' placeholder='Buscar salas' onChange={(event) => filtrarSalasPorNome(event.target.value)}/>
                            <BsFilterLeft className='salas-icon-filtro' onClick={() => setShowModalFiltroSala(true)} />
                            <HiSearch className='salas-icon-search'/>
                        </div>
                        <div className="divRoomsAllContainer">
                            {roomsFiltered == [] || roomsFiltered.length === 0 || roomsFiltered == null || roomsFiltered === undefined ?

                                filterAplicado ?
                                    <NothingContentRooms
                                        text1={"Não temos nenhuma sala com esse filtro"}
                                        text2={"tente outro filtro"}
                                        isInteractive={true}
                                    />
                                    :
                                    <NothingContentRooms
                                        text1={"Não temos nenhuma sala pública"}
                                        text2={"Seja o primeiro a criar"}
                                        isInteractive={true}
                                    />
                                : roomsFiltered.map((element) => (
                                    <React.Fragment key={element.id}>
                                        <CardRoom imgJogadores={null} nomeEquipe={element.name} faltantes={element.capacity} gameName={element.gameName} rankGame={element.rankGame} levelGame={element.levelGame} descricao={element.description} idAdmin={element.idUserAdmin} isClick={false} idGroup={element.id} />
                                    </React.Fragment>
                                ))}
                        </div>
                    </div>
                    <div className="bottomDiv">
                        <div className="inputDiv">
                            <input type="text" className='inputRooms' placeholder='Buscar minhas salas' />
                            {/* <BsFilterLeft className='salas-icon-filtro' onClick={() => setShowModalFiltroSala(true)} /> */}
                            <HiSearch className='salas-icon-search-baixo' />

                            <div className='divButtonCriarSala' onClick={() => {
                                setShowModalCriarSala(true)
                                // retrieveGames()
                            }}>
                                Criar sala
                            </div>
                        </div>
                        <div className="divRoomsAllContainer">
                            {rooms == [] || rooms.length === 0 || rooms == null || rooms === undefined ?

                                filterAplicado ?
                                    <NothingContentRooms
                                        text1={"Não temos nenhuma sala com esse filtro"}
                                        text2={"tente outro filtro"}
                                        isInteractive={true}
                                    />
                                    :
                                    <NothingContentRooms
                                        text1={"Não temos nenhuma sala pública"}
                                        text2={"Seja o primeiro a criar"}
                                        isInteractive={true}
                                    />
                                : rooms.filter((element) => element.idUserAdmin === USERID).map((element) => (
                                    <React.Fragment key={element.id}>
                                        <CardRoom imgJogadores={null} nomeEquipe={element.name} faltantes={element.capacity} gameName={element.gameName} rankGame={element.rankGame} levelGame={element.levelGame} descricao={element.description} idAdmin={element.idUserAdmin} isClick={false} idGroup={element.id} />
                                    </React.Fragment>
                                ))}

                            {/* <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idAdmin={1}  idGroup={1} /> */}
                        </div>
                    </div>
                </div>
            </div>


            {showModalCriarSala && (
                <Modal title="Criar uma sala" icon={<MdGroups />} clearAll={true} temFooter={true} ativarBotao={true} iconButton={<BsArrowRightShort />} textButton='Criar' onClose={() => setShowModalCriarSala(false)} onClear={limparModalCriarSala} onClickButton={criarSala}>
                    <div className="container_filtro">
                        <div className="filtro_jogos">
                            <p className="titleFiltro">Escolha um jogo</p>
                            <div className="jogos">
                                {gamesApi.map((game) => (
                                    <React.Fragment key={game.id}>
                                        <div style={{ backgroundImage: `url(${game.imageGame.link})`, }}
                                            className={idGameSelecionado == game.id ? 'gameModalSelected gameModalSelectedPlus' : 'gameModalSelected '}
                                            onClick={() => {
                                                setJogoSelecionado(game.name)
                                                setIdGameSelecionado(game.id)
                                            }}>
                                            <p>{game.name}</p>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="filtro_descricao">
                            <p className="titleFiltro">Nome da sala</p>
                            <textarea
                                className="my-textarea my-textarea-input-name-room"
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
                    </div>
                </Modal >
            )
            }

            {
                showToast && (
                    <Toast
                        type={toastType}
                        message={toastMessage}
                        onClose={() => setShowToast(false)}
                    />
                )
            }

            {
                showModalCalendario && (

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
                )
            }

            {
                showModalFiltroSala && (
                    <Modal title="Filtrar por" icon={<BsFilterLeft />} clearAll='true' temFooter='true' ativarBotao='true' iconButton={<BsArrowRightShort />} textButton='Filtrar' onClear={limparFiltroSalas} onClose={() => setShowModalFiltroSala(false)} onClickButton={filtrarSalas}>
                        <div className="container_filtro">

                            <div className="filtro_jogos">
                                <p className="titleFiltro">Meus Jogos</p>
                                <div className="jogos">
                                    {jogos.lenght > 0 || jogos.map((jogo) => (
                                        <React.Fragment key={jogo.id}>
                                            <Tag
                                                text={jogo.name}
                                                isSelected={jogoSelecionado === jogo.name ? true : false}
                                                onClick={() => setJogoSelecionado(jogo.name)} />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </Modal>
                )
            }
        </>
    );
}


export const NothingContentRooms = (props) => {
    return (
        <>
            <div className='nothingContentRooms'>
                <h1 className='nothingContentRoomsH1'>{props.text1} </h1>
                <p className='nothingContentRoomsP'>{props.text2}</p>
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