const packs = {
  celebrities: [

    // ⚽ FOOTBALL
    { name: "Cristiano Ronaldo", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/400px-Cristiano_Ronaldo_2018.jpg" },
    { name: "Lionel Messi", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Messi_vs_Nigeria_2018.jpg/400px-Messi_vs_Nigeria_2018.jpg" },
    { name: "Neymar", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Neymar_2018_%28cropped%29.jpg/400px-Neymar_2018_%28cropped%29.jpg" },
    { name: "Kylian Mbappe", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2019-07-17_SG_Dynamo_Dresden_vs_Paris_Saint-Germain_by_Sandro_Halank%E2%80%93140_%28cropped%29.jpg/400px-2019-07-17_SG_Dynamo_Dresden_vs_Paris_Saint-Germain_by_Sandro_Halank%E2%80%93140_%28cropped%29.jpg" },
    { name: "Zlatan Ibrahimovic", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Zlatan_Ibrahimovic_Euro_2012_%28cropped%29.jpg/400px-Zlatan_Ibrahimovic_Euro_2012_%28cropped%29.jpg" },
    { name: "Robert Lewandowski", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Robert_Lewandowski%2C_Germany_vs._Poland_%2822-03-2013%29.jpg/400px-Robert_Lewandowski%2C_Germany_vs._Poland_%2822-03-2013%29.jpg" },
    { name: "Mohamed Salah", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Mohamed_Salah_2018.jpg/400px-Mohamed_Salah_2018.jpg" },
    { name: "Luka Modric", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Luka_Modri%C4%87_in_2019.jpg/400px-Luka_Modri%C4%87_in_2019.jpg" },
    { name: "David Beckham", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/David_Beckham_2014.jpg/400px-David_Beckham_2014.jpg" },
    { name: "Zinedine Zidane", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Zinedine_Zidane_2019.jpg/400px-Zinedine_Zidane_2019.jpg" },
    { name: "Erling Haaland", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Erling_Haaland_2022.jpg/400px-Erling_Haaland_2022.jpg" },

    // 🎵 MUSIC
    { name: "Taylor Swift", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png/400px-191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png" },
    { name: "Eminem", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Eminem_2013.jpg/400px-Eminem_2013.jpg" },
    { name: "Ed Sheeran", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Ed_Sheeran_%28cropped%29.jpg/400px-Ed_Sheeran_%28cropped%29.jpg" },
    { name: "Justin Bieber", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Justin_Bieber_in_2015.jpg/400px-Justin_Bieber_in_2015.jpg" },
    { name: "Adele", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Adele_2016.jpg/400px-Adele_2016.jpg" },
    { name: "Drake", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Drake_July_2016.jpg/400px-Drake_July_2016.jpg" },
    { name: "Ariana Grande", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ariana_Grande_-_2018_Billboard_Music_Awards.png/400px-Ariana_Grande_-_2018_Billboard_Music_Awards.png" },
    { name: "Rihanna", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Rihanna_-_This_Is_My_Shot_Photocall_%28cropped%29.jpg/400px-Rihanna_-_This_Is_My_Shot_Photocall_%28cropped%29.jpg" },
    { name: "Beyonce", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Beyonce_-_GMA_performance_%28cropped%29.jpg/400px-Beyonce_-_GMA_performance_%28cropped%29.jpg" },
    { name: "Michael Jackson", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Michael_Jackson_in_1988.jpg/400px-Michael_Jackson_in_1988.jpg" },
    { name: "Lady Gaga", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Lady_Gaga_-_Joanne_World_Tour%2C_Vancouver_%28cropped%29.jpg/400px-Lady_Gaga_-_Joanne_World_Tour%2C_Vancouver_%28cropped%29.jpg" },
    { name: "Billie Eilish", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Billie_Eilish_2019_by_Glenn_Francis_%28cropped%29.jpg/400px-Billie_Eilish_2019_by_Glenn_Francis_%28cropped%29.jpg" },
    { name: "Post Malone", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Post_Malone_2019_by_Glenn_Francis.jpg/400px-Post_Malone_2019_by_Glenn_Francis.jpg" },

    // 🎬 ACTORS
    { name: "Leonardo DiCaprio", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Leonardo_DiCaprio_Cannes_2019.jpg/400px-Leonardo_DiCaprio_Cannes_2019.jpg" },
    { name: "Brad Pitt", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Brad_Pitt_2019_by_Glenn_Francis.jpg/400px-Brad_Pitt_2019_by_Glenn_Francis.jpg" },
    { name: "Tom Cruise", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Tom_Cruise_by_Gage_Skidmore_2.jpg/400px-Tom_Cruise_by_Gage_Skidmore_2.jpg" },
    { name: "Robert Downey Jr", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/400px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg" },
    { name: "Will Smith", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Will_Smith_2011.jpg/400px-Will_Smith_2011.jpg" },
    { name: "Johnny Depp", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Johnny_Depp_-_TIFF_2011_%28cropped%29.jpg/400px-Johnny_Depp_-_TIFF_2011_%28cropped%29.jpg" },
    { name: "Dwayne Johnson", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/400px-Dwayne_Johnson_2014_%28cropped%29.jpg" },
    { name: "Scarlett Johansson", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Scarlett_Johansson_2010.jpg/400px-Scarlett_Johansson_2010.jpg" },
    { name: "Morgan Freeman", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Morgan_Freeman_at_the_2017_Cairo_International_Film_Festival_%28cropped%29.jpg/400px-Morgan_Freeman_at_the_2017_Cairo_International_Film_Festival_%28cropped%29.jpg" },
    { name: "Tom Hanks", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tom_Hanks_TIFF_2019.jpg/400px-Tom_Hanks_TIFF_2019.jpg" },
    { name: "Keanu Reeves", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Keanu_Reeves_2013_%28cropped%29.jpg/400px-Keanu_Reeves_2013_%28cropped%29.jpg" },
    { name: "Joaquin Phoenix", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Joaquin_Phoenix_-_Her_premiere_-_Village_East_Cinema_%28cropped%29.jpg/400px-Joaquin_Phoenix_-_Her_premiere_-_Village_East_Cinema_%28cropped%29.jpg" },

    // 🏀 BASKETBALL
    { name: "LeBron James", category: "basketball", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/LeBron_James_crop1.jpg/400px-LeBron_James_crop1.jpg" },
    { name: "Stephen Curry", category: "basketball", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Stephen_Curry_2014_%28cropped%29.jpg/400px-Stephen_Curry_2014_%28cropped%29.jpg" },
    { name: "Kevin Durant", category: "basketball", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Kevin_Durant_2014_%28cropped%29.jpg/400px-Kevin_Durant_2014_%28cropped%29.jpg" },
    { name: "Kobe Bryant", category: "basketball", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kobe_Bryant_2014.jpg/400px-Kobe_Bryant_2014.jpg" },
    { name: "Michael Jordan", category: "basketball", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Michael_Jordan_in_2014.jpg/400px-Michael_Jordan_in_2014.jpg" },
    { name: "Shaquille ONeal", category: "basketball", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Shaquille_O%27Neal_2011.jpg/400px-Shaquille_O%27Neal_2011.jpg" },

    // 💻 TECH
    { name: "Elon Musk", category: "tech", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/400px-Elon_Musk_Royal_Society_%28crop2%29.jpg" },
    { name: "Bill Gates", category: "tech", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bill_Gates_2018.jpg/400px-Bill_Gates_2018.jpg" },
    { name: "Mark Zuckerberg", category: "tech", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/400px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg" },
    { name: "Steve Jobs", category: "tech", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/400px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg" },
    { name: "Jeff Bezos", category: "tech", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg/400px-Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg" },

    // 🥊 SPORT
    { name: "Conor McGregor", category: "sport", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Conor_McGregor_2019.jpg/400px-Conor_McGregor_2019.jpg" },
    { name: "Usain Bolt", category: "sport", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Usain_Bolt_by_Augustas_Didzgalvis_%28cropped%29.jpg/400px-Usain_Bolt_by_Augustas_Didzgalvis_%28cropped%29.jpg" },
    { name: "Roger Federer", category: "sport", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Roger_Federer_2018.jpg/400px-Roger_Federer_2018.jpg" },
    { name: "Serena Williams", category: "sport", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Serena_Williams_at_the_2013_US_Open.jpg/400px-Serena_Williams_at_the_2013_US_Open.jpg" },
    { name: "Muhammad Ali", category: "sport", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/400px-Muhammad_Ali_NYWTS.jpg" },
    { name: "Mike Tyson", category: "sport", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Tyson_2019_%28cropped%29.jpg/400px-Mike_Tyson_2019_%28cropped%29.jpg" },

    // 🎮 GAMING
    { name: "PewDiePie", category: "gaming", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/PewDiePie_by_Gage_Skidmore.jpg/400px-PewDiePie_by_Gage_Skidmore.jpg" },
    { name: "MrBeast", category: "gaming", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/MrBeast_holding_a_Nickelodeon_Kids%27_Choice_Awards_blimp.jpg/400px-MrBeast_holding_a_Nickelodeon_Kids%27_Choice_Awards_blimp.jpg" },

    // 🐭 CARTOONS — only free/commons images, no copyrighted character art
    { name: "SpongeBob", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/SpongeBob_SquarePants_premiere_cropped.jpg/400px-SpongeBob_SquarePants_premiere_cropped.jpg" },
    { name: "Shrek", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Shrek_2001_film.jpg/400px-Shrek_2001_film.jpg" },
    { name: "Pikachu", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/400px-International_Pok%C3%A9mon_logo.svg.png" },
    { name: "Bart Simpson", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Simpsons_-_Sent_to_Springfield.jpg/400px-The_Simpsons_-_Sent_to_Springfield.jpg" },
    { name: "Homer Simpson", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Simpsons_-_Sent_to_Springfield.jpg/400px-The_Simpsons_-_Sent_to_Springfield.jpg" },
    { name: "Tom Cat", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Tom_and_Jerry_logo.svg/400px-Tom_and_Jerry_logo.svg.png" },
    { name: "Bugs Bunny", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Looney_Tunes_logo.svg/400px-Looney_Tunes_logo.svg.png" },
    { name: "Winnie the Pooh", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Winniepoohandpiglet.jpg/400px-Winniepoohandpiglet.jpg" },

    // 🇷🇺 CARTOONS RU
    { name: "Cheburashka", category: "cartoons_ru", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Cheburashka.jpg/400px-Cheburashka.jpg" },
    { name: "Masha", category: "cartoons_ru", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Masha_and_the_Bear_logo.svg/400px-Masha_and_the_Bear_logo.svg.png" },

    // 🇯🇵 ANIME — use promotional/logo images from commons
    { name: "Naruto", category: "anime", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/NarutoPart1.jpg/400px-NarutoPart1.jpg" },
    { name: "Goku", category: "anime", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Dragon_Ball_Z_Son_Goku.jpg/400px-Dragon_Ball_Z_Son_Goku.jpg" },
    { name: "Doraemon", category: "anime", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Doraemon_character.png/400px-Doraemon_character.png" },
    { name: "Totoro", category: "anime", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/My_Neighbor_Totoro_-_Totoro.jpg/400px-My_Neighbor_Totoro_-_Totoro.jpg" },

    // 🦸 SUPERHEROES — use real actor photos from MCU/DCEU premieres (commons)
    { name: "Spider-Man", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Tom_Holland_by_Gage_Skidmore.jpg/400px-Tom_Holland_by_Gage_Skidmore.jpg" },
    { name: "Batman", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Robert_Pattinson_2017.jpg/400px-Robert_Pattinson_2017.jpg" },
    { name: "Iron Man", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/400px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg" },
    { name: "Superman", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Henry_Cavill_in_2013_%28cropped%29.jpg/400px-Henry_Cavill_in_2013_%28cropped%29.jpg" },
    { name: "Thor", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Chris_Hemsworth_by_Gage_Skidmore_3_%28cropped%29.jpg/400px-Chris_Hemsworth_by_Gage_Skidmore_3_%28cropped%29.jpg" },
    { name: "Captain America", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Chris_Evans_-_Captain_America_2.jpg/400px-Chris_Evans_-_Captain_America_2.jpg" },
    { name: "Wonder Woman", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Gal_Gadot_by_Gage_Skidmore_%28cropped%29.jpg/400px-Gal_Gadot_by_Gage_Skidmore_%28cropped%29.jpg" },
    { name: "Deadpool", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Ryan_Reynolds_2016.jpg/400px-Ryan_Reynolds_2016.jpg" },
    { name: "Black Widow", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Scarlett_Johansson_2010.jpg/400px-Scarlett_Johansson_2010.jpg" },

    // 🕹️ VIDEOGAMES — use developers/cosplay/game cover photos from commons
    { name: "Mario", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Shigeru_Miyamoto_-_Game_Developers_Choice_Awards_2007_%28cropped%29.jpg/400px-Shigeru_Miyamoto_-_Game_Developers_Choice_Awards_2007_%28cropped%29.jpg" },
    { name: "Sonic", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Yuji_Naka_in_2012.jpg/400px-Yuji_Naka_in_2012.jpg" },
    { name: "Geralt of Rivia", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Andrzej_Sapkowski_at_Paris_Game_Week_%28cropped%29.jpg/400px-Andrzej_Sapkowski_at_Paris_Game_Week_%28cropped%29.jpg" },
    { name: "Kratos", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Christopher_Judge_by_Gage_Skidmore_%28cropped%29.jpg/400px-Christopher_Judge_by_Gage_Skidmore_%28cropped%29.jpg" },
    { name: "Lara Croft", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Alicia_Vikander_2018_%28cropped%29.jpg/400px-Alicia_Vikander_2018_%28cropped%29.jpg" },
  ]
};

module.exports = packs;
