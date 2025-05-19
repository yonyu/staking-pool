import GameImg from "../images/Games.png";
import Game1 from "../images/Game1.png";
import Game2 from "../images/Game2.png";
import Game3 from "../images/Game3.png";
import "bootstrap-icons/font/bootstrap-icons.css";

export const IContent2 = () => {
  return (
    <div className="IContent2">
      <div className="topTitle">
        <div id="line"></div>

        <div>
          <div className="text">
            <span className="title title1">
              GAMES <span style={{ color: "#5F3DFF" }}>&</span> DAPPS
            </span>
          </div>
        </div>

        <div id="line"></div>
      </div>

      <div className="topText">
        <div id="letter">
          <span>
            The <span style={{ color: "white" }}>MUNITY</span> realms beckon for
            your assistance! Take on the challenge and test your skills in the
            exhilarating world of horse racing. Only your expertise can secure
            victory and rescue this vibrant realm.
          </span>
        </div>
      </div>

      <div className="imgTitle">
        <div className="leftTitle">
          <div
            className="GameImage"
            style={{
              backgroundImage: `url(${Game1})`,
            }}
          >
            <div className="boldText">
              <span>
                STUTEN GARDEN: <br></br>Horse Catching RPG
              </span>
            </div>
            <div className="lineText">
              <span>Catch,Tame,Awake your NFT Metahorses!</span>
            </div>
            <div className="buttonWrap">
              <div className="bottomBtn">
                PLAY NOW<i className="bi bi-play-fill"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="centerTitle">
          <div
            className="GameImage"
            style={{
              backgroundImage: `url(${Game2})`,
            }}
          >
            <div className="boldText">
              <span>METAHORSE UNITY</span>
            </div>
            <div className="lineText">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </span>
            </div>
            <div className="buttonWrap">
              <div className="bottomBtn2">COMING SOON</div>
            </div>
          </div>
        </div>

        <div className="rightTitle">
          <div
            className="GameImage"
            style={{
              backgroundImage: `url(${Game3})`,
            }}
          >
            <div className="boldText">
              <span>M-DEED</span>
            </div>
            <div className="lineText">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt
              </span>
            </div>
            <div className="buttonWrap">
              <div className="bottomBtn2">COMING SOON</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
