function Header({ title, year }){

    return(
        <>
            <h1>{ title }</h1>
            <p>Coolest Coder since { year }</p>
        </>
    )
}

export default Header