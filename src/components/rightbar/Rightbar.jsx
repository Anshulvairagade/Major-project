import "./rightbar.css"

export default function Rightbar() {
  return (
    <div className="rightbar">
        <div className="rightbarWrapper">
          <div className="birthdayConatiner">
            <img className="birthdayImg" src="/assets/gift.png" alt="" />
            <span className="birthdayText"><b>Rajat Mohad</b> and <b>3 other friends</b> have birthday today.
            </span>
          </div>
          <img className="rightbarAd" src="/assets/ad.jpg" alt="" />
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">

            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                  <img className="rightbarProfileImg" src="/assets/6.jpg" alt="" />
                  <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUsername">Anshul Vairagade</span>
            </li>

            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                  <img className="rightbarProfileImg" src="/assets/6.jpg" alt="" />
                  <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUsername">Anshul Vairagade</span>
            </li>

            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                  <img className="rightbarProfileImg" src="/assets/6.jpg" alt="" />
                  <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUsername">Anshul Vairagade</span>
            </li>

            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                  <img className="rightbarProfileImg" src="/assets/6.jpg" alt="" />
                  <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUsername">Anshul Vairagade</span>
            </li>

            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                  <img className="rightbarProfileImg" src="/assets/6.jpg" alt="" />
                  <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUsername">Anshul Vairagade</span>
            </li>

            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                  <img className="rightbarProfileImg" src="/assets/6.jpg" alt="" />
                  <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUsername">Anshul Vairagade</span>
            </li>

            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                  <img className="rightbarProfileImg" src="/assets/6.jpg" alt="" />
                  <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUsername">Anshul Vairagade</span>
            </li>

          </ul>
        </div>
    </div>
  );
}
