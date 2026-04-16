function Sidebar({items}){
    return(
        <>
            <nav>
                <ul>
                    {
                        items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))
                    }
                </ul>
            </nav>
        </>
    )
}

export default Sidebar