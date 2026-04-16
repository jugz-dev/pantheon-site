function DocumentList({documents}){
    return(
        <>  
            <ol>
                {documents.map((document) => (
                    <li key={document.id}>
                        <h3>{document.title}</h3>
                        <p>{document.status}</p>
                    </li>
                ))}
            </ol>
        </>
    )
}

export default DocumentList