from .models import CarMake, CarModel


def initiate():
    data = {
        "Toyota": [("Camry", "SEDAN", 2022), ("RAV4", "SUV", 2023),
                   ("Corolla", "SEDAN", 2021)],
        "Honda": [("Civic", "SEDAN", 2022), ("CR-V", "SUV", 2023)],
        "Audi": [("A6", "SEDAN", 2020), ("Q5", "SUV", 2022)],
        "Ford": [("Escape", "SUV", 2021), ("Fusion", "SEDAN", 2019)],
        "Nissan": [("Altima", "SEDAN", 2020), ("Rogue", "SUV", 2022)],
    }
    for make_name, models_list in data.items():
        make = CarMake.objects.create(
            name=make_name, description="Great cars by " + make_name)
        for name, ctype, year in models_list:
            CarModel.objects.create(
                car_make=make, name=name, type=ctype, year=year)
