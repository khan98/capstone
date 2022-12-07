import React, { useState } from "react";
import { getNo } from "../../auth";
import instance from "../../api/config";
import { Link, useNavigate } from "react-router-dom";
import './/FriendsList.css'
//import e from "cors";

function FriendsList()
{
    const [friendToAdd, setaddedfriend] = useState("");
    const onChangeFriend= (event) => {
        setaddedfriend(event.target.value)
    }

    let content= '';
    const myfriends = async () => {
        //reset event listeners on table
        let oldtable = document.getElementById('table');
        let table=oldtable.cloneNode(true);
        oldtable.parentNode.replaceChild(table,oldtable);
        //clear table
        content= '';
        table.innerHTML = content;
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

                    content+= '<div>'+d.username +'</div>'
                    table.innerHTML += content;
                    content= '';
                    //create button
                    var btn = document.createElement("button");
                    var text = document.createTextNode('remove friend')
                    table.appendChild(btn);
                    btn.appendChild(text);
                    btn.id= d.username;
                    //add event listener
                    table.addEventListener('click', function(e){if (e.target&&e.target.id ==d.username ){removeFriend(user,d.username);} });
                    
                } 
            }
            
        } catch (error) {
            console.log(error);
        }
        
    };

    const friendRequests = async () => {
        //reset event listeners on table
        let oldtable = document.getElementById('table');
        let table=oldtable.cloneNode(true);
        oldtable.parentNode.replaceChild(table,oldtable);
        
        //clear table
        content= '';
        table.innerHTML = content;

        const user = getNo();
        content =' friends requests';
        try{
            const response = await instance.post(`/friendRequests`,{user,});
            if (response)
            {
                for (let d of response.data) {
                    content+= '<div>'+d.username +'</div>'
                    table.innerHTML += content;
                    content= '';
                    //create button
                    var btn = document.createElement("button");
                    var text = document.createTextNode('accept request')
                    table.appendChild(btn);
                    btn.appendChild(text);
                    btn.id= d.username;
                    //add event listener
                    table.addEventListener('click', function(e){if (e.target&&e.target.id ==d.username ){acceptFriend(user,d.username);} });
                    //create button
                    var btn = document.createElement("button");
                    var text = document.createTextNode('reject request')
                    table.appendChild(btn);
                    btn.appendChild(text);
                    btn.id= d.username+'2';
                    //add event listener
                    table.addEventListener('click', function(e){if (e.target&&e.target.id ==(d.username+'2') ){removeFriend(user,d.username);} });
                    
                } 
            }
        }
        catch(error)
        {console.log(error);}
       
    }

    //see sent friend requests
    const sentRequests = async () => {
        //reset event listeners on table
        let oldtable = document.getElementById('table');
        let table=oldtable.cloneNode(true);
        oldtable.parentNode.replaceChild(table,oldtable);
        //clear table
        content= '';
        table.innerHTML = content;
        const user = getNo();
        content =' request list  ';
        try {
            const response = await instance.post(
                `/requests`,
                {
                    user,
                }
            );
           
            if (response) { 
                for (let d of response.data) {

                    content+= '<div>'+d.username +'</div>'
                    table.innerHTML += content;
                    content= '';
                    //create button
                    var btn = document.createElement("button");
                    var text = document.createTextNode('cancel friend request')
                    table.appendChild(btn);
                    btn.appendChild(text);
                    btn.id= d.username;
                    //add event listener
                    table.addEventListener('click', function(e){if (e.target&&e.target.id ==d.username ){removeFriend(user,d.username);} });
                    
                } 
            }
            
        } catch (error) {
            console.log(error);
        }
        
    };
        
         //no display edit comands

    const acceptFriend = async (usernum, friendName) => {
        const user = usernum;
        const Friend = friendName;
        //alert(" accept called");
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
        //alert(" removed called");
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


    const tester2= async(input)=>
    {
        alert('tester2'+ input)
    }

    const tester= async()=>
    {
        //reset the event listeners on the table
        let oldtable = document.getElementById('table');
        let table=oldtable.cloneNode(true);
        oldtable.parentNode.replaceChild(table,oldtable);

        //create button and give it 
        var btn = document.createElement("button");
        var text = document.createTextNode('text')
        table.appendChild(btn);
        btn.appendChild(text);
        btn.id= 'btna';

        var btn2 = document.createElement("button");
        var text2 = document.createTextNode('text2')
        table.appendChild(btn2);
        btn2.appendChild(text2);
        btn2.id = 'btnb';

        var name = 'btnb';
        
        table.addEventListener('click', function(e){if (e.target&&e.target.id ==name ){tester2(name);} });
         
        //add evnt listener to button
        //table.addEventListener('click', handelclick);
       
        
        
        content += '<div>post test</div>'
        table.innerHTML += content;
        //table.innerHTML= ' none'

    }


return (
    <div className="friendslist">
           <h1>Friends List  </h1> 
           <button onClick={myfriends}>
                my friends
           </button>
           <button onClick={friendRequests}>
                friend requests
           </button>
           <button onClick={sentRequests}>
                sent friend requests
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

