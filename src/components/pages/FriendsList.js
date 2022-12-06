import React, { useState } from "react";
import { getNo } from "../../auth";
import instance from "../../api/config";
import { Link, useNavigate } from "react-router-dom";

function FriendsList()
{
    const [friendToAdd, setaddedfriend] = useState("");
    const onChangeFriend= (event) => {
        setaddedfriend(event.target.value)
    }

    let content= '';
    const myfriends = async () => {
        let table = document.getElementById('table');
        const user = getNo();
        content =' friends list  ';
        try {
            const response = await instance.post(
                `/friends`,
                {
                    user,
                }
            );
           
            if (response) { 
                for (let d of response.data) {

                    content+= '<div>'+d.username +'<button onClick={removeFriend('+user+','+d.username+')}> remove friend </button></div>'
                } 
            }
            
        } catch (error) {
            console.log(error);
        }
        table.innerHTML = content;
    };

    const friendRequests = async () => {
        let table = document.getElementById('table');
        const user = getNo();
        content =' friends requests';
        try{
            const response = await instance.post(`/friendRequests`,{user,});
            if (response)
            {
                for (let d of response.data) {
                    content+= '<div>'+d.username +'<button onClick={acceptFriend('+user+','+d.username+')}> accept request</button>'
                    content +=' <button onClick={removeFriend('+user+','+d.username+')}> reject request</button> </div>'
                    
                    
                } 
            }
        }
        catch(error)
        {console.log(error);}
        table.innerHTML = content;
    }

    const acceptFriend = async (usernum, friendName) => {
        const user = usernum;
        const Friend = friendName;
        alert(" accept called");
        try{
            const response = await instance.post(`/acceptFriend`,{user,Friend,});
            if (response)
            {
                alert(Friend+" added");
            }
        }
        catch(error)
        {console.log(error);}
    }

    const removeFriend = async (usernum, friendName) => {
        const user = usernum;
        const Friend = friendName;
        alert(" removed called");
        try{
            const response = await instance.post(`/dropFriend`,{user,Friend,});
            if (response)
            {
                alert(Friend+" removed");
            }
        }
        catch(error)
        {console.log(error);}
    }

    const addFriend = async () => {
        let table = document.getElementById('table');
        const user =  getNo();
        const Friend =friendToAdd;
        //alert("adding friend"+ Friend);
        try{
            const response = await instance.post(`/addFriend`,{user,Friend,});
            if (response)
            {
                content = response.data;
            }
        }
        catch(error)
        {console.log(error);}
        table.innerHTML = content;
    }




return (
    <div>
           <h1>test  </h1> 
           <button onClick={myfriends}>
                my friends
           </button>
           <button onClick={friendRequests}>
                friend requests
           </button>
           <button onClick={addFriend}>
                add friend
           </button>
           <div className="input-container">
                    <p className="text-input-title-text">friend Username</p>
                    <input className="text-input" type="text" value={friendToAdd} onChange={onChangeFriend} />
            </div>
            <div>display</div>
           <div id='table' ></div>

    </div>
);

}
export default FriendsList;

