//isLoggedIn

export const isLoggedIn=()=>
{
    let data=localStorage.getItem("data");
    if(data!=null)
    {
        return true;
    }
    else{
        return false;
    }
};

//doLogin=> data=>set to localstorage

export const doLogin=(data,next)=>
{
   localStorage.setItem("data",JSON.stringify(data));
   next();
};


//doLogout=> data=>Remove from localstorage

export const doLogout=(next)=>
{
    localStorage.removeItem("data");
    next();
};
