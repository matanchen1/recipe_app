
const tileData = [
    {
        img: 'https://ifoodreal.com/wp-content/uploads/2018/12/FG-healthy-spinach-salad-recipe.jpg',
        title: 'ceaser salad',
            author: 'Grandma',
        text: '\n' +
            'It is a widely believed misconception that Caesar Salad originated in Rome and was named after Julius Caesar. Rather, it was invented in 1924 by Caesar Cardini, an Italian immigrant in Mexico. It so happened that on a very busy day, Cardini, the owner of a restaurant on a buzzing street, was running low on ingredients. Very soon many customers arrived and in an attempt to make something he tossed together some remaining items. These were lettuce, garlic, croutons, Parmesan cheese, olive oil, eggs, and Worcestershire sauce. Thus the Caesar Salad was born!'
    },
    {
        img: 'https://images.unsplash.com/photo-1571047399553-603e2138b646?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbGFkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
        title: 'Fajita salad',
        author: 'Naomi',
        text: 'One of the most interesting facets of the American culinary revolution of the past 50 years is our growing fascination with culinary history. It seems the more we learn about the ethnic melting pot that makes up the American table, the more curious we become about regional cuisines and the origin of specific dishes. Texas is the proud home of an authentic regional cuisine, and the provenance of Tex-Mex foods is currently a very hot topic with everyone from academic researchers to cookbook authors to magazine and newspaper food writers. In exploring the history of fajitas, several credible stories emerge, and all of them have roots in the Rio Grande Valley of Texas. It only makes sense that several people from the same ethnic group with roots in the same geographic area would come up with similar cooking techniques and names for the raw materials at hand.'
    },
    {
        img: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHNhbGFkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'
        , title: 'Israeli salad',
        author: 'Dandan',
        text: 'There is more to Israeli salad than chopped tomatoes and cucumbers. The salad, an accompaniment in Israel for breakfast, lunch and dinner, has a long history with versions made throughout the Mediterranean and the Mid-dle and Near East.\n' +
            '\n' +
            'The dish was shaped by Israel’s years of austerity when cucumbers and tomatoes were plentiful and made popular by hotel buffets and kibbutzim. It is known by several different names in Israel including, salat yerakot (vegetable salad), salat katzutz (chopped salad), salat aravi (Arab salad) and salat turka (Turkish salad), but apparently it is never called Israeli salad.\n' +
            '\n' +
            'My version is probably most like what the Israelis call hakol salat (everything salad) and can be made into a main dish perfect for summer’s warm weather. The recipe starts with a base salad and then suggests customizations, including a choice of dressings. The dressing recipes make enough to serve with the base salad with a mix-in or two. Adjust dressing recipes and add more chopped onion to taste as needed when using more of the add-in ingredients.'
    },
    {
        img: 'https://feelgoodfoodie.net/wp-content/uploads/2019/02/Mediterranean-Chopped-Salad-5-500x500.jpg',
        title: 'Tuna salad',
        author: 'fancycrave1',
        text: 'There is more to Israeli salad than chopped tomatoes and cucumbers. The salad, an accompaniment in Israel for breakfast, lunch and dinner, has a long history with versions made throughout the Mediterranean and the Mid-dle and Near East.\n' +
            '\n' +
            'The dish was shaped by Israel’s years of austerity when cucumbers and tomatoes were plentiful and made popular by hotel buffets and kibbutzim. It is known by several different names in Israel including, salat yerakot (vegetable salad), salat katzutz (chopped salad), salat aravi (Arab salad) and salat turka (Turkish salad), but apparently it is never called Israeli salad.\n' +
            '\n' +
            'My version is probably most like what the Israelis call hakol salat (everything salad) and can be made into a main dish perfect for summer’s warm weather. The recipe starts with a base salad and then suggests customizations, including a choice of dressings. The dressing recipes make enough to serve with the base salad with a mix-in or two. Adjust dressing recipes and add more chopped onion to taste as needed when using more of the add-in ingredients.',
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHNhbGFkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
        title: 'Salad Nicoise',
        author: 'Bruno',
        text: 'An organization called Cercle de la Capelina d’Or, led for many years by Renée Graglia until her death in 2013,[8] continues to protest against deviation from traditional local recipes. The group, which certifies restaurants in Nice, sticks with Médecin\'s standards. They reject commonly included ingredients such as green beans and potatoes, as well as innovations such as including sweetcorn, mayonnaise, shallots and lemon.[3][9]\n' +
            '\n' +
            'In 2016, French Michelin-starred chef Hélène Darroze posted a salade niçoise recipe on Facebook that included cooked potatoes and green beans. According to journalist Mathilde Frénois, the reaction on Facebook was quick and hostile from the "purists". Darroze\'s version was called "a massacre of the recipe", a "sacrilege", and a violation of the "ancestral traditions" of the salad. She was warned that it is "dangerous to innovate".[10]'
    },
    {
        img: 'https://www.olivetomato.com/wp-content/uploads/2019/12/Green-salad-with-feta.jpeg',
        title: 'Greek salad',
        author: 'flora',
        text: 'An organization called Cercle de la Capelina d’Or, led for many years by Renée Graglia until her death in 2013,[8] continues to protest against deviation from traditional local recipes. The group, which certifies restaurants in Nice, sticks with Médecin\'s standards. They reject commonly included ingredients such as green beans and potatoes, as well as innovations such as including sweetcorn, mayonnaise, shallots and lemon.[3][9]\n' +
            '\n' +
            'In 2016, French Michelin-starred chef Hélène Darroze posted a salade niçoise recipe on Facebook that included cooked potatoes and green beans. According to journalist Mathilde Frénois, the reaction on Facebook was quick and hostile from the "purists". Darroze\'s version was called "a massacre of the recipe", a "sacrilege", and a violation of the "ancestral traditions" of the salad. She was warned that it is "dangerous to innovate".[10]'
    },
    {
        img: "https://images.unsplash.com/photo-1568158918251-8eb4601f0c5f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHNhbGFkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        title: "Grablax salad",
        author: "Bruno",
        text: 'An organization called Cercle de la Capelina d’Or, led for many years by Renée Graglia until her death in 2013,[8] continues to protest against deviation from traditional local recipes. The group, which certifies restaurants in Nice, sticks with Médecin\'s standards. They reject commonly included ingredients such as green beans and potatoes, as well as innovations such as including sweetcorn, mayonnaise, shallots and lemon.[3][9]\n' +
            '\n' +
            'In 2016, French Michelin-starred chef Hélène Darroze posted a salade niçoise recipe on Facebook that included cooked potatoes and green beans. According to journalist Mathilde Frénois, the reaction on Facebook was quick and hostile from the "purists". Darroze\'s version was called "a massacre of the recipe", a "sacrilege", and a violation of the "ancestral traditions" of the salad. She was warned that it is "dangerous to innovate".[10]'
    }
        ,
    {
        img:" https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHNhbGFkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        title: "Capreze salad",
        author: "Betina",
        text: 'An organization called Cercle de la Capelina d’Or, led for many years by Renée Graglia until her death in 2013,[8] continues to protest against deviation from traditional local recipes. The group, which certifies restaurants in Nice, sticks with Médecin\'s standards. They reject commonly included ingredients such as green beans and potatoes, as well as innovations such as including sweetcorn, mayonnaise, shallots and lemon.[3][9]\n' +
            '\n' +
            'In 2016, French Michelin-starred chef Hélène Darroze posted a salade niçoise recipe on Facebook that included cooked potatoes and green beans. According to journalist Mathilde Frénois, the reaction on Facebook was quick and hostile from the "purists". Darroze\'s version was called "a massacre of the recipe", a "sacrilege", and a violation of the "ancestral traditions" of the salad. She was warned that it is "dangerous to innovate".[10]'
    }
];

export default tileData;
