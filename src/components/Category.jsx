import React, { useState } from "react";


//const [data,setData]=useState(Products)
//const filterResult=(catItem)=>{
//  const result=Products.filter((curData)=>{
//    return curData.category===catItem;
//  });
//}

const Category = () => {
  return (
    <>
      <img
        className="h-24 mb-3 "
        src="./img/logo-no-background-2.png"
        alt="SM Burger"
      />
      <p className="text-3xl font-bold pt-10"></p>
      <ul className="space-y-2 text-lg font-semibold">
        <li>
          <button className=" btn-kategorien-active" onClick={() => filterResult('Burger')}>Burger</button>
        </li>
        <li>
          <button className="btn-kategorien" onClick={() => filterResult('Beilagen')}>Beilagen</button>
        </li>
        <li>
          <button className="btn-kategorien" onClick={() => filterResult('Getränke')}>Getränke</button>
        </li>
        <li>
          <button className="btn-kategorien">Build-your-Burger</button>
        </li>
      </ul>
      <button className=" bottom-btn2 absolute inset-x-0 bottom-0 mx-4 my-3">
        Bestellvorgang abbrechen
      </button>
    </>
  );
};

export default Category;
