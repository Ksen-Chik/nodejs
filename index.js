const createListElement = (linkText, linkAddress) => {
    let ul = document.getElementsByClassName("data")[0];
    let a = document.createElement('a');
    a.appendChild(document.createTextNode(linkText));
    a.href = `?catalog=${linkAddress}`;
    let li = document.createElement('li');
    li.appendChild(a);
    ul.appendChild(li)

    return a;
}

const getData = async (address, previous) => {
    let response = await fetch(`?catalog=${address}`);
    let data = await response.json();

    let fileNode = document.getElementsByClassName("file-text")[0];
    fileNode.innerHTML = '';

    let ul = document.getElementsByClassName("data")[0];
    ul.innerHTML = '';

    if (previous !== undefined && address !== "") {
        let a = createListElement('..', previous);
        a.onclick = (event) => {
            event.preventDefault();
            getData(previous, previous);
        };
    }

    if (Array.isArray(data)) {
        data.forEach(element => {
            let a = createListElement(element, `${address}\\${element}`);
            a.onclick = (event) => {
                event.preventDefault();
                console.log(address);
                getData(`${address}\\${element}`, address);
            };
        });
    } else {
        fileNode.innerHTML = data;
    }
}

getData("");