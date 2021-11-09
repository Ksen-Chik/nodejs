const createListElement = (linkText, linkAddress) => {
    let ul = document.getElementsByClassName("data")[0];
    let a = document.createElement('a');
    a.appendChild(document.createTextNode(linkText));
    a.href = `?path=${linkAddress}`;
    let li = document.createElement('li');
    li.appendChild(a);
    ul.appendChild(li)

    return a;
}

const getPrevFolder = (path) => {
    let splitted = path.split('\\');
    splitted.pop();
    return splitted.join('\\');
}

const getData = async (address) => {
    let response = await fetch(`?path=${address}`);
    let data = await response.json();

    let fileNode = document.getElementsByClassName("file-text")[0];
    fileNode.innerHTML = '';

    let ul = document.getElementsByClassName("data")[0];
    ul.innerHTML = '';

    if (address !== '') {
        const previous = getPrevFolder(address);
        let a = createListElement('..', previous);
        a.onclick = async (event) => {
            event.preventDefault();
            await getData(previous);
        };
    }

    if (Array.isArray(data)) {
        data.forEach(element => {
            let a = createListElement(element, `${address}\\${element}`);
            a.onclick = async (event) => {
                event.preventDefault();
                console.log(address);
                await getData(`${address}\\${element}`);
            };
        });
    } else {
        fileNode.innerHTML = data;
    }
}

getData("");