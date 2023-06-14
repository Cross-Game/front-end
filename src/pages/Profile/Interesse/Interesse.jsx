import React, { useEffect, useState } from "react";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./Interesse.css";
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from "../../../components/Modal";
import { MdOutlineInterests } from "react-icons/md";
import { BsArrowRightShort, BsCheck } from "react-icons/bs";
import { interesses as listaInteresses } from "../../../utils/interesses.js"
import Tag from "../../../components/Tag";
import UserProfile from "../../../components/UserProfile";
import { TOKEN, USERID, currentURL } from "../../../data/constants";
import axios from "axios";
import Toast from "../../../components/Toast";

function ProfileJogo() {

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('erro');

    const [showModalAdicionarInteresse, setShowModalAdicionarInteresse] = useState(false);

    const [interesses, setInteresses] = useState(listaInteresses);
    const [interesseSelecionado, setInteresseSelecionado] = useState("");
    const [categoriaSelecionadas, setCategoriaSelecionadas] = useState([]);

    const [listaPreferencias, setListaPreferencias] = useState([])
    const [update, setUpdate] = useState(false)
    function limparInteresses() {
        setCategoriaSelecionadas();
        setInteresseSelecionado("");
    }

    useEffect(() => {
        const obterMeusInteresses = () => {
            axios
                .get(`${currentURL}/preferences/${USERID}`, {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TOKEN}`,
                    },
                })
                .then((response) => {
                    console.log(response.data.preferences)
                    setListaPreferencias(response.data.preferences)
                })
                .catch((error) => {
                    mudarToast("erro", "Erro ao obter interesses");
                });
        };
        obterMeusInteresses()
    }, [update]);


    function removerInteresse(idPreferencia) {
        console.log(idPreferencia)
        axios
        .delete(`${currentURL}/preferences/${USERID}/${idPreferencia}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
        })
        .then(() => {
            mudarToast("sucesso", "Interesse excluido com sucesso");
            setUpdate(!update)
        })
        .catch((error) => {
            mudarToast("erro", "Erro ao obter interesses");
        });
    };

    function cadastrarInteresse() {
        let data = categoriaSelecionadas.map(categoria => categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/ /g, "_"));
        const payload = data.map(preferences => ({ preferences }));
        axios.post(
            `${currentURL}/preferences/${USERID}`, 
            payload
            , {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`
                },
            }
        )
            .then((response) => {
                console.log("aqui")
                if (response.status === 201) {
                    mudarToast("sucesso", "Interesses cadastrados com sucesso");
                    setCategoriaSelecionadas([]);
                    setInteresseSelecionado([]);
                    setTimeout(() => {
                        setShowModalAdicionarInteresse(false);
                        setUpdate(!update)
                    }, 1000);
                } else {
                    mudarToast("erro", "Erro ao cadastrar interesses");
                }
            })
            .catch((error) => {
                if(error.response.status === 409){
                    mudarToast("erro", "Interesse já cadastrado");
                }
            });
    };

    function mudarToast(tipo, mensagem) {
        setShowToast(true);
        setToastType(tipo.toLowerCase());
        setToastMessage(mensagem);
    }


    function adicionar() {
        return (

            <>
                <div className="ProfileJogoMiniContainer">
                    <div className="ProfileJogoContainerButtonAdicionar">
                        <span className="ProfileJogoButtonAdicionar" onClick={() => setShowModalAdicionarInteresse(true)}>
                            Adicionar
                            <AiFillPlusCircle className="ProfileIconAdicionar" /></span>
                    </div>
                </div>
                <div className="ProfileJogoCardContainer">
                    <div className="cardInteresse">
                        <div className="header">Meus interesses</div>
                        <div className="body">
                                { listaPreferencias && listaPreferencias.map((preferencia, index) => (
                                    <div>
                                        <div className="skillInteresse" key={index}>
                                        <div className="skill-percent-number-preference"> {preferencia.preferences}</div>
                                        <div className="skill-percent-number-interesse" onClick={() => removerInteresse(preferencia.id)}> <RiDeleteBinLine className="skill-percent-delete" /> </div>
                                        </div>
                                        <hr/> 
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {showModalAdicionarInteresse && (
                    <Modal title="Interesses" icon={<MdOutlineInterests />} temFooter={true} ativarBotao={true} textButton="Adicionar" iconButton={<BsCheck />} clearAll={true} onClear={limparInteresses} onClickButton={cadastrarInteresse} onClose={() => setShowModalAdicionarInteresse(false)}>
                        <div className="ModalCadastrarInteresse-body">
                            Interesse
                            <div className="ModalCadastrarInteresse-interesses">

                                {
                                    interesses.map((interesse) => (
                                        <React.Fragment key={interesse.id}>
                                            <Tag
                                                text={interesse.nome}
                                                isSelected={interesseSelecionado === interesse.nome ? true : false}
                                                onClick={() => { setInteresseSelecionado(interesse.nome); setCategoriaSelecionadas([]) }}
                                            />
                                        </React.Fragment>
                                    ))}
                            </div>

                            Categoria
                            <div className="ModalCadastrarInteresse-categorias">
                                {interesses &&
                                    interesses.find((interesse) => interesse.nome === interesseSelecionado)?.categorias.map((categoria, index) => (
                                        <React.Fragment key={categoria}>
                                            <Tag
                                                text={categoria}
                                                isSelected={categoriaSelecionadas.includes(categoria)}
                                                onClick={() =>
                                                    setCategoriaSelecionadas((prevCategorias) => {
                                                        if (prevCategorias.includes(categoria)) {
                                                            return prevCategorias.filter((cat) => cat !== categoria);
                                                        } else {
                                                            return [...prevCategorias, categoria];
                                                        }
                                                    })
                                                }
                                            />
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                        </div>
                    </Modal>

                )}

                {showToast && (
                    <Toast
                        type={toastType}
                        message={toastMessage}
                        onClose={() => setShowToast(false)}
                    />
                )}

            </>
        )
    }



    return (
        <>
            <ProfileNavbar interesses={{ color: '#fff', borderBottom: '2px solid #0f3' }}
                sidebar={<Sidebar />}
                adicionar={adicionar()}
            />
        </>
    )
}

export default ProfileJogo;