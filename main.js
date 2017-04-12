/**
 * Created by Valh on 17.03.2017.
 */
//const idGeneratorForCategory = idGenerator();
const idGeneratorForGood = idGenerator();
const idGeneratorForProperty = idGenerator();
const idGeneratorForAttribute = idGenerator();

const attribute1 = new Attribute('Размер','size','number',1);
const attribute2 = new Attribute('Для кого','forWho','string',2);

const attributes = [attribute1, attribute2]

const category = new Category(null,'Категоря','category',attributes);
const category1 = new Category(category,'Категоря 1','category1',attributes);
const category2 = new Category(category,'Категоря 2','category2',attributes);
const category11 = new Category(category1,'Категоря 11','category11',attributes);
const category12 = new Category(category1,'Категоря 12','category12',attributes);
const category21 = new Category(category2,'Категоря 21','category21',[attribute1]);
const category22 = new Category(category2,'Категоря 22','category22',[attribute1]);

const categories = [category,category1,category2,category11,category12,category21,category22];

const good1 =  new Good('good111',10,'sht',category11,[new Property(1,42),new Property(2,'men')]);
const good2 =  new Good('good112',10,'sht',category11,[new Property(1,43),new Property(2,'women')]);
const good3 =  new Good('good121',10,'sht',category12,[new Property(1,44),new Property(2,'men')]);
const good4 =  new Good('good122',10,'sht',category12,[new Property(1,45),new Property(2,'women')]);
const good5 =  new Good('good211',10,'sht',category21,[new Property(1,46)]);
const good6 =  new Good('good212',10,'sht',category21,[new Property(1,42)]);
const good7 =  new Good('good221',10,'sht',category22,[new Property(1,43)]);
const good8 =  new Good('good222',10,'sht',category22,[new Property(1,44)]);
const good9 =  new Good('good11',10,'sht',category1,[new Property(1,45),new Property(2,'men')]);
const good10 =  new Good('good12',10,'sht',category1,[new Property(1,46),new Property(2,'women')]);
const good11 =  new Good('good1',10,'sht',category,[new Property(1,42),new Property(2,'men')]);

function idGenerator() {
    let id = 1;
    return function () {
        return id++;
    }
}

const mainDiv = document.getElementById('main');
const nav = document.getElementsByTagName('nav')[0];
nav.onclick =tree_toggle;

const tree = createTree(category,'root');
nav.appendChild(tree);

function createTree(category,isRoot,IsLast) {
    const ul = document.createElement('ul');
    ul.className = 'Container';
    const li = document.createElement('li');
    if(category.childrenOfCategory.length===0)
        li.className = 'Node ExpandLeaf';
    else
        li.className = 'Node ExpandOpen';
    if(isRoot)
        li.classList.add('isRoot');
    if(IsLast)
        li.classList.add('IsLast');
    ul.appendChild(li);
    const div1 = document.createElement('div');
    div1.className = 'Expand';
    li.appendChild(div1);
    const div2 = document.createElement('div');
    div2.className = 'Content';
    div2.innerHTML = category.showingName;
    div2.id = 'divCategory_'+ (category.id-1);
    div2.onclick = function (elem) {
        const idCategory = elem.currentTarget.id.toString().substring(12);
        const category = categories[+idCategory];
        createForm(category);
    }
    li.appendChild(div2);
    for (let i = 0; i< category.childrenOfCategory.length;i++) {
        if(i===category.childrenOfCategory.length-1)
            li.appendChild(createTree(category.childrenOfCategory[i],null,'IsLast'));
        else
            li.appendChild(createTree(category.childrenOfCategory[i]));
    }
    return ul;
}

function tree_toggle(event) {
    event = event || window.event
    const clickedElem = event.target || event.srcElement
    if (!hasClass(clickedElem, 'Expand')) {
        return // клик не там
    }
    const node = clickedElem.parentNode
    if (hasClass(node, 'ExpandLeaf')) {
        return
    }
    const newClass = hasClass(node, 'ExpandOpen') ? 'ExpandClosed' : 'ExpandOpen'
    const re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/
    node.className = node.className.replace(re, '$1'+newClass+'$3')
}

function hasClass(elem, className) {
    return new RegExp("(^|\\s)"+className+"(\\s|$)").test(elem.className)
}

function createForm (category) {
    let tableOfGoods = document.getElementById('tableOfGoods');
    if(!tableOfGoods) {
        tableOfGoods = document.createElement('div');
        tableOfGoods.id = 'tableOfGoods';
    }
    tableOfGoods.innerHTML = '';
    tableOfGoods.appendChild(createTableOfGoods(category));
    mainDiv.appendChild(tableOfGoods);

    let form = document.getElementById('mainForm');
    if(!form) {
        form = document.createElement('form');
        form.id = 'mainForm';
    }
    form.innerHTML ='';
    const  table = document.createElement('table');
    table.appendChild(createTr('nameOfGood','Название товара'));
    table.appendChild(createTr('priceOfGood','Цена товара'));
    table.appendChild(createTr('unitOfCalculationOfGood','Единица исчесление'));
    for(let i=0;i<category.attributesOfGoods.length;i++)
        table.appendChild(createTr(category.attributesOfGoods[i]+'OfGood',category.attributesOfGoods[i].showingName));
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    tr.appendChild(td);
    const button = document.createElement('button');
    button.innerHTML ='Добавить'
    td.appendChild(button);
    table.appendChild(tr);
    form.appendChild(table);
    mainDiv.appendChild(form);
}

function createTr(inputId,labelShowingName) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    tr.appendChild(td1);
    tr.appendChild(td2);
    const label = document.createElement('label');
    label.for = inputId;
    label.innerHTML = labelShowingName;
    const input = document.createElement('input');
    input.type = 'text';
    input.id = inputId;
    td1.appendChild(label);
    td2.appendChild(input);
    return tr;
}

function createTableOfGoods(category) {
    const  table = document.createElement('table');
    table.appendChild(createHeadOfTableGoods(category));
    for (let i=0;i<category.goodsOfCategory.length;i++){
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        tdName.innerHTML = category.goodsOfCategory[i].name;
        tr.appendChild(tdName);
        const tdPrice = document.createElement('td');
        tdPrice.innerHTML = category.goodsOfCategory[i].price;
        tr.appendChild(tdPrice);
        const tdUnitOfCalculation = document.createElement('td');
        tdUnitOfCalculation.innerHTML = category.goodsOfCategory[i].unitOfCalculation;;
        tr.appendChild(tdUnitOfCalculation);
        for(let j=0;j<category.goodsOfCategory[i].properties.length;j++){
            const td = document.createElement('td');
            td.innerHTML = category.goodsOfCategory[i].properties[j].value;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

function  createHeadOfTableGoods(category) {
    const tr = document.createElement('tr');
    const thName = document.createElement('th');
    thName.innerHTML = 'Название товара';
    tr.appendChild(thName);
    const thPrice = document.createElement('th');
    thPrice.innerHTML ='Цена';;
    tr.appendChild(thPrice);
    const thUnitOfCalculation = document.createElement('th');
    thUnitOfCalculation.innerHTML = 'Единица исчисления';
    tr.appendChild(thUnitOfCalculation);
    for(let i=0;i<category.attributesOfGoods.length;i++){
        const th = document.createElement('th');
        th.innerHTML = category.attributesOfGoods[i].showingName;
        tr.appendChild(th);
    }
    return tr;
}