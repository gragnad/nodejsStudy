async function getUser() {
    try {
        const res = await axios.get('/users');
        const users = res.data;
        const lists = document.getElementById('List');
        lists.innerHTML = '';
        //사용자 마다 반복적으로 화면 표시 및 이벤트 연결
        Object.keys(users).map(function (key) {
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = users[key];
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', () => {
                nameChangeButton(key);
            });
            const remove =document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', () => {
                nameRemoveButton(key);
            });
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            lists.appendChild(userDiv);
            console.log(res.data);
        });
    } catch (err) {
        console.log(err);
    }
}

async function nameChangeButton(key) {
    const name = prompt('바꿀 이름을 입력하세요');
    if(!name) {
        return alert('이름을 반드시 입력해주세요');
    }
    try {
        await axios.put('/user/' + key, {name});
        getUser();
    } catch (err) {
        console.log(err);
    }
}

async function nameRemoveButton(key) {
    try {
        await axios.delete('/user/' + key);
        getUser();
    } catch (err) {
        console.log(err);
    }
}

window.onload = getUser;

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.userName.value;
    if(!name) {
        return alert('이름을 입력하세요');
    }
    try {
        await axios.post('/user', {name});
        getUser();
    } catch (err) {
        console.log(err);
    }
    e.target.userName.value='';
});