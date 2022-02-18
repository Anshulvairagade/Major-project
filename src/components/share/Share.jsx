import "./share.css"
import { PermMedia, Label, Room, EmojiEmotions,   } from "@mui/icons-material"

export default function Share() {
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src="/assets/3.jpg" alt="" />
                <input placeholder="What's in your mind Himanshu?" className="shareInput" />
            </div>
            <hr className="shareHr" />
            <div className="shareBottom">
                <div className="shareOptions">

                    <div className="shareOption">
                        <PermMedia htmlColor="Tomato" className="shareIcon" />
                        <span className="shareOptionText">Photo or Video</span>
                    </div>

                    <div className="shareOption">
                        <Label htmlColor="Blue" className="shareIcon" />
                        <span className="shareOptionText">Tag</span>
                    </div>

                    <div className="shareOption">
                        <Room htmlColor="Green" className="shareIcon" />
                        <span className="shareOptionText">Location</span>
                    </div>

                    <div className="shareOption">
                        <EmojiEmotions htmlColor="Goldenrod" className="shareIcon" />
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton">Share</button>
            </div>
        </div>
    </div>
  );
}
