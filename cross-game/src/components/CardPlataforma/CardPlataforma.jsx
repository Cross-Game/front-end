import React from "react";
import "./CardPlataforma.css"

function CardPlataforma(props) {

    return (
        <>
            <div class="containerPlataforma noselect">
                <div class="canvas">
                    <div class="tracker tr-1"></div>
                    <div class="tracker tr-2"></div>
                    <div class="tracker tr-3"></div>
                    <div class="tracker tr-4"></div>
                    <div class="tracker tr-5"></div>
                    <div class="tracker tr-6"></div>
                    <div class="tracker tr-7"></div>
                    <div class="tracker tr-8"></div>
                    <div class="tracker tr-9"></div>
                    <div class="tracker tr-10"></div>
                    <div class="tracker tr-11"></div>
                    <div class="tracker tr-12"></div>
                    <div class="tracker tr-13"></div>
                    <div class="tracker tr-14"></div>
                    <div class="tracker tr-15"></div>
                    <div class="tracker tr-16"></div>
                    <div class="tracker tr-17"></div>
                    <div class="tracker tr-18"></div>
                    <div class="tracker tr-19"></div>
                    <div class="tracker tr-20"></div>
                    <div class="tracker tr-21"></div>
                    <div class="tracker tr-22"></div>
                    <div class="tracker tr-23"></div>
                    <div class="tracker tr-24"></div>
                    <div class="tracker tr-25"></div>
                    <div id="card">
                        <p  class="title" >Playstation</p>
                        <img src={props.img} alt="" id="prompt" />
                    </div>
                </div>
            </div>
        </>
    )

}

export default CardPlataforma;