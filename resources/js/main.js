let component = new Component()

component.clickBurger()
component.clickCard()
component.activeHover()
component.bindComponent()

component.deleteCar()
component.updateCar()
component.alertify()
component.loadContent()

let search = document.getElementById("btnCari")
search.addEventListener("click",function () {
    component.searchContent();
})