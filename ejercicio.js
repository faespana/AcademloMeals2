function getFruitsByColor(color) {

const fruitsByColor = {
   red: ["manzana", "fresa"] ,
   yellow: ["piña", "banana"],
   purple: ["moras", "uvas"] 
}

return fruitsByColor[color] || "the color must be: red, yellow, purple"
// if (color === "red") return ["manzana", "fresa"] 
// if (color === "yellow") return ["piña", "banana"] 
// if (color === "purple") return ["moras", "uvas"] 

// return "the color must be: red, yellow, purple"
}

console.log(getFruitsByColor("blue"));
