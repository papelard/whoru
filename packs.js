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
    { name: "Ronaldinho", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Ronaldinho_2018.jpg/400px-Ronaldinho_2018.jpg" },
    { name: "Zinedine Zidane", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Zinedine_Zidane_2019.jpg/400px-Zinedine_Zidane_2019.jpg" },
    { name: "David Beckham", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/David_Beckham_2014.jpg/400px-David_Beckham_2014.jpg" },
    { name: "Erling Haaland", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Erling_Haaland_2022.jpg/400px-Erling_Haaland_2022.jpg" },
    { name: "Vinicius Junior", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Vinicius_Junior_2022.jpg/400px-Vinicius_Junior_2022.jpg" },

    // 🎵 MUSIC
    { name: "Taylor Swift", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png/400px-191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png" },
    { name: "Eminem", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Eminem_2013.jpg/400px-Eminem_2013.jpg" },
    { name: "Ed Sheeran", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Ed_Sheeran_%28cropped%29.jpg/400px-Ed_Sheeran_%28cropped%29.jpg" },
    { name: "Justin Bieber", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Justin_Bieber_in_2015.jpg/400px-Justin_Bieber_in_2015.jpg" },
    { name: "Adele", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Adele_2016.jpg/400px-Adele_2016.jpg" },
    { name: "Drake", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Drake_July_2016.jpg/400px-Drake_July_2016.jpg" },
    { name: "Ariana Grande", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ariana_Grande_-_2018_Billboard_Music_Awards.png/400px-Ariana_Grande_-_2018_Billboard_Music_Awards.png" },
    { name: "The Weeknd", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/The_Weeknd_in_2018.png/400px-The_Weeknd_in_2018.png" },
    { name: "Rihanna", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Rihanna_-_This_Is_My_Shot_Photocall_%28cropped%29.jpg/400px-Rihanna_-_This_Is_My_Shot_Photocall_%28cropped%29.jpg" },
    { name: "Beyonce", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Beyonce_-_GMA_performance_%28cropped%29.jpg/400px-Beyonce_-_GMA_performance_%28cropped%29.jpg" },
    { name: "Michael Jackson", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Michael_Jackson_in_1988.jpg/400px-Michael_Jackson_in_1988.jpg" },
    { name: "Lady Gaga", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Lady_Gaga_-_Joanne_World_Tour%2C_Vancouver_%28cropped%29.jpg/400px-Lady_Gaga_-_Joanne_World_Tour%2C_Vancouver_%28cropped%29.jpg" },
    { name: "Post Malone", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Post_Malone_2019_by_Glenn_Francis.jpg/400px-Post_Malone_2019_by_Glenn_Francis.jpg" },
    { name: "Billie Eilish", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Billie_Eilish_2019_by_Glenn_Francis_%28cropped%29.jpg/400px-Billie_Eilish_2019_by_Glenn_Francis_%28cropped%29.jpg" },

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
    { name: "Shaquille O'Neal", category: "basketball", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Shaquille_O%27Neal_2011.jpg/400px-Shaquille_O%27Neal_2011.jpg" },

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

    // 🐭 CARTOONS (Disney / Pixar / DreamWorks)
    { name: "Mickey Mouse", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Mickey_Mouse_%28Steamboat_Willie%29.jpg/400px-Mickey_Mouse_%28Steamboat_Willie%29.jpg" },
    { name: "SpongeBob SquarePants", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/400px-SpongeBob_SquarePants_character.svg.png" },
    { name: "Shrek", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Shrek_and_Fiona.jpg/400px-Shrek_and_Fiona.jpg" },
    { name: "Simba", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/Simba_from_Disney%27s_The_Lion_King.jpg/400px-Simba_from_Disney%27s_The_Lion_King.jpg" },
    { name: "Woody", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Woody_%28Toy_Story%29.png/400px-Woody_%28Toy_Story%29.png" },
    { name: "Buzz Lightyear", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Buzz_Lightyear.png/400px-Buzz_Lightyear.png" },
    { name: "Elsa", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Elsa_from_Disney%27s_Frozen_%282013%29.png/400px-Elsa_from_Disney%27s_Frozen_%282013%29.png" },
    { name: "Moana", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Moana_%28Disney%29.png/400px-Moana_%28Disney%29.png" },
    { name: "Gru", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Gru_Despicable_Me.png/400px-Gru_Despicable_Me.png" },
    { name: "Minion", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Minions_Banana.jpg/400px-Minions_Banana.jpg" },
    { name: "Donkey Kong", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/DK64_Donkey_Kong_Artwork.png/400px-DK64_Donkey_Kong_Artwork.png" },
    { name: "Tom Cat", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Tom_Tom_and_Jerry.png/400px-Tom_Tom_and_Jerry.png" },
    { name: "Jerry Mouse", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Jerry_Mouse.png/400px-Jerry_Mouse.png" },
    { name: "Bugs Bunny", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Bugs_Bunny.png/400px-Bugs_Bunny.png" },
    { name: "Bart Simpson", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Bart_Simpson_200px.png/400px-Bart_Simpson_200px.png" },
    { name: "Homer Simpson", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Homer_Simpson_2006.png/400px-Homer_Simpson_2006.png" },
    { name: "Scooby-Doo", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Scooby-Doo_character.jpg/400px-Scooby-Doo_character.jpg" },
    { name: "Winnie the Pooh", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Winnie_the_Pooh_with_honey_pot_hd.png/400px-Winnie_the_Pooh_with_honey_pot_hd.png" },
    { name: "Pikachu", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/400px-Pok%C3%A9mon_Pikachu_art.png" },
    { name: "Kung Fu Panda", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Po_Kung_Fu_Panda.png/400px-Po_Kung_Fu_Panda.png" },
    { name: "Nemo", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Nemo_from_Finding_Nemo.PNG/400px-Nemo_from_Finding_Nemo.PNG" },
    { name: "Wall-E", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/WALLE_EVE.JPG/400px-WALLE_EVE.JPG" },
    { name: "Puss in Boots", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Puss_in_Boots_%28Shrek%29.png/400px-Puss_in_Boots_%28Shrek%29.png" },
    { name: "Paddington Bear", category: "cartoons", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Paddington_Bear_-_Journey_to_Peru_cropped.png/400px-Paddington_Bear_-_Journey_to_Peru_cropped.png" },

    // 🇷🇺 CARTOONS RUSSIAN
    { name: "Cheburashka", category: "cartoons_ru", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Cheburashka.jpg/400px-Cheburashka.jpg" },
    { name: "Crocodile Gena", category: "cartoons_ru", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Gena_the_Crocodile.jpg/400px-Gena_the_Crocodile.jpg" },
    { name: "Masha", category: "cartoons_ru", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Masha_and_the_Bear.jpg/400px-Masha_and_the_Bear.jpg" },
    { name: "Hedgehog in the Fog", category: "cartoons_ru", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Hedgehog_in_the_Fog.jpg/400px-Hedgehog_in_the_Fog.jpg" },
    { name: "Nu Pogodi Wolf", category: "cartoons_ru", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Nu_Pogodi.jpg/400px-Nu_Pogodi.jpg" },
    { name: "Fixiki", category: "cartoons_ru", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Fixiki_characters.jpg/400px-Fixiki_characters.jpg" },
    { name: "Luntik", category: "cartoons_ru", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Luntik.jpg/400px-Luntik.jpg" },

    // 🇯🇵 ANIME
    { name: "Naruto", category: "anime", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/NarutoPart1.jpg/400px-NarutoPart1.jpg" },
    { name: "Goku", category: "anime", image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Dragon_Ball_Z_Son_Goku.jpg/400px-Dragon_Ball_Z_Son_Goku.jpg" },
    { name: "Luffy", category: "anime", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Monkey_D_Luffy.png/400px-Monkey_D_Luffy.png" },
    { name: "Pikachu", category: "anime", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Pok%C3%A9mon_Pikachu_art.png/400px-Pok%C3%A9mon_Pikachu_art.png" },
    { name: "Totoro", category: "anime", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/My_Neighbor_Totoro_-_Totoro.jpg/400px-My_Neighbor_Totoro_-_Totoro.jpg" },
    { name: "Doraemon", category: "anime", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Doraemon_character.png/400px-Doraemon_character.png" },
    { name: "Sasuke", category: "anime", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Sasuke_Uchiha.png/400px-Sasuke_Uchiha.png" },
    { name: "Gojo Satoru", category: "anime", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Gojo_Satoru.png/400px-Gojo_Satoru.png" },
    { name: "Levi Ackerman", category: "anime", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Levi_Ackerman.png/400px-Levi_Ackerman.png" },
    { name: "Ichigo Kurosaki", category: "anime", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Bleach_vol_01.jpg/400px-Bleach_vol_01.jpg" },
    { name: "Light Yagami", category: "anime", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Death_Note_volume_1.jpg/400px-Death_Note_volume_1.jpg" },
    { name: "Edward Elric", category: "anime", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Fullmetal_Alchemist_volume_1.jpg/400px-Fullmetal_Alchemist_volume_1.jpg" },

    // 🦸 SUPERHEROES
    { name: "Spider-Man", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Web_of_Spider-Man_Vol_1_129-1.png/400px-Web_of_Spider-Man_Vol_1_129-1.png" },
    { name: "Batman", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Batman_%28DC_Comics_character%29.jpg/400px-Batman_%28DC_Comics_character%29.jpg" },
    { name: "Iron Man", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Iron_Man_%28circa_2018%29.png/400px-Iron_Man_%28circa_2018%29.png" },
    { name: "Superman", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Superman_%28DC_character%29.jpg/400px-Superman_%28DC_character%29.jpg" },
    { name: "Wonder Woman", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Wonder_Woman.jpg/400px-Wonder_Woman.jpg" },
    { name: "Captain America", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Captain_America_%28circa_2018%29.png/400px-Captain_America_%28circa_2018%29.png" },
    { name: "Thor", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Thor_avengers_age_of_ultron.jpg/400px-Thor_avengers_age_of_ultron.jpg" },
    { name: "Hulk", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Hulk_%28comics_character%29.jpg/400px-Hulk_%28comics_character%29.jpg" },
    { name: "Deadpool", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Deadpool_%28Marvel_Comics_character%29.png/400px-Deadpool_%28Marvel_Comics_character%29.png" },
    { name: "Black Panther", category: "superheroes", image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Black_Panther_%28Marvel_Comics_character%29.jpg/400px-Black_Panther_%28Marvel_Comics_character%29.jpg" },

    // 🎮 VIDEO GAME CHARACTERS
    { name: "Mario", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/MarioNSMBUDeluxe.png/400px-MarioNSMBUDeluxe.png" },
    { name: "Sonic the Hedgehog", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Sonic_the_Hedgehog_promotional_art.png/400px-Sonic_the_Hedgehog_promotional_art.png" },
    { name: "Link", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Link_Artwork_1_%28Breath_of_the_Wild%29.png/400px-Link_Artwork_1_%28Breath_of_the_Wild%29.png" },
    { name: "Master Chief", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Master_Chief_%28Halo%29.jpg/400px-Master_Chief_%28Halo%29.jpg" },
    { name: "Kratos", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/Kratos_God_of_War.jpg/400px-Kratos_God_of_War.jpg" },
    { name: "Lara Croft", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Lara_Croft_-_Definitive_Edition.jpg/400px-Lara_Croft_-_Definitive_Edition.jpg" },
    { name: "Geralt of Rivia", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Witcher3_Geralt.jpg/400px-Witcher3_Geralt.jpg" },
    { name: "Arthur Morgan", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Arthur_Morgan_-_Red_Dead_Redemption_2.png/400px-Arthur_Morgan_-_Red_Dead_Redemption_2.png" },
    { name: "Steve", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Steve_Minecraft.png/400px-Steve_Minecraft.png" },
    { name: "Fortnite Character", category: "videogames", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Fortnite_-_Jonesy_character_art.jpg/400px-Fortnite_-_Jonesy_character_art.jpg" }

  ]
};

module.exports = packs;