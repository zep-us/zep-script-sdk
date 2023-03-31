import { ScriptPlayer } from "./src/ScriptPlayer";
import {PutObjectType} from "./src/ScriptMap";

export {};

ScriptMap.putObjectMultiple([[0,1]],PutObjectType.stroke)

ScriptApp.onJoinPlayer.Add(function (player){
    player.showBuyAlert("1",3,()=>{
        
    },false,{message: "dd",}
)
})