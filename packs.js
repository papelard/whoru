const packs = {
  celebrities: [
    // ⚽ FOOTBALL
    { name: "Cristiano Ronaldo", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg" },
    { name: "Lionel Messi", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Messi_vs_Nigeria_2018.jpg/800px-Messi_vs_Nigeria_2018.jpg" },
    { name: "Neymar", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Neymar_2018_%28cropped%29.jpg/800px-Neymar_2018_%28cropped%29.jpg" },
    { name: "Kylian Mbappe", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2019-07-17_SG_Dynamo_Dresden_vs_Paris_Saint-Germain_by_Sandro_Halank%E2%80%93140_%28cropped%29.jpg/800px-2019-07-17_SG_Dynamo_Dresden_vs_Paris_Saint-Germain_by_Sandro_Halank%E2%80%93140_%28cropped%29.jpg" },
    { name: "Zlatan Ibrahimovic", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Zlatan_Ibrahimovic_Euro_2012_%28cropped%29.jpg/800px-Zlatan_Ibrahimovic_Euro_2012_%28cropped%29.jpg" },
    { name: "Robert Lewandowski", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Robert_Lewandowski%2C_Germany_vs._Poland_%2822-03-2013%29.jpg/800px-Robert_Lewandowski%2C_Germany_vs._Poland_%2822-03-2013%29.jpg" },
    { name: "Luka Modric", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Luka_Modri%C4%87_in_2019.jpg/800px-Luka_Modri%C4%87_in_2019.jpg" },
    { name: "Mohamed Salah", category: "football", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Mohamed_Salah_2018.jpg/800px-Mohamed_Salah_2018.jpg" },

    // 🎵 MUSIC
    { name: "Taylor Swift", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png/800px-191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png" },
    { name: "Eminem", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Eminem_2013.jpg/800px-Eminem_2013.jpg" },
    { name: "Rihanna", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Rihanna_-_This_Is_My_Shot_Photocall_%28cropped%29.jpg/800px-Rihanna_-_This_Is_My_Shot_Photocall_%28cropped%29.jpg" },
    { name: "Justin Bieber", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/sixty-four/Justin_Bieber_in_2015.jpg/800px-Justin_Bieber_in_2015.jpg" },
    { name: "Beyonce", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Beyonce_-_GMA_performance_%28cropped%29.jpg/800px-Beyonce_-_GMA_performance_%28cropped%29.jpg" },
    { name: "Ed Sheeran", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Ed_Sheeran_%28cropped%29.jpg/800px-Ed_Sheeran_%28cropped%29.jpg" },
    { name: "Adele", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Adele_2016.jpg/800px-Adele_2016.jpg" },
    { name: "Drake", category: "music", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Drake_July_2016.jpg/800px-Drake_July_2016.jpg" },

    // 🎬 ACTORS
    { name: "Leonardo DiCaprio", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Leonardo_DiCaprio_Cannes_2019.jpg/800px-Leonardo_DiCaprio_Cannes_2019.jpg" },
    { name: "Brad Pitt", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Brad_Pitt_2019_by_Glenn_Francis.jpg/800px-Brad_Pitt_2019_by_Glenn_Francis.jpg" },
    { name: "Dwayne Johnson", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/800px-Dwayne_Johnson_2014_%28cropped%29.jpg" },
    { name: "Tom Cruise", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Tom_Cruise_by_Gage_Skidmore_2.jpg/800px-Tom_Cruise_by_Gage_Skidmore_2.jpg" },
    { name: "Scarlett Johansson", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Scarlett_Johansson_2010.jpg/800px-Scarlett_Johansson_2010.jpg" },
    { name: "Robert Downey Jr", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/800px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg" },
    { name: "Will Smith", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Will_Smith_2011.jpg/800px-Will_Smith_2011.jpg" },
    { name: "Johnny Depp", category: "actors", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Johnny_Depp_-_TIFF_2011_%28cropped%29.jpg/800px-Johnny_Depp_-_TIFF_2011_%28cropped%29.jpg" },

    // 🏀 BASKETBALL
    { name: "LeBron James", category: "basketball", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/LeBron_James_crop1.jpg/800px-LeBron_James_crop1.jpg" },
    { name: "Stephen Curry", category: "basketball", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Stephen_Curry_2014_%28cropped%29.jpg/800px-Stephen_Curry_2014_%28cropped%29.jpg" },
    { name: "Kevin Durant", category: "basketball", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Kevin_Durant_2014_%28cropped%29.jpg/800px-Kevin_Durant_2014_%28cropped%29.jpg" },
    { name: "Kobe Bryant", category: "basketball", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kobe_Bryant_2014.jpg/800px-Kobe_Bryant_2014.jpg" },

    // 🎮 GAMING
    { name: "Ninja", category: "gaming", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Tyler_%22Ninja%22_Blevins_at_the_2018_Dubai_World_Gaming_Championship_%28cropped%29.jpg/800px-Tyler_%22Ninja%22_Blevins_at_the_2018_Dubai_World_Gaming_Championship_%28cropped%29.jpg" },
    { name: "PewDiePie", category: "gaming", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/PewDiePie_by_Gage_Skidmore.jpg/800px-PewDiePie_by_Gage_Skidmore.jpg" },

    // 🚀 TECH / SCIENCE
    { name: "Elon Musk", category: "tech", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/800px-Elon_Musk_Royal_Society_%28crop2%29.jpg" },
    { name: "Bill Gates", category: "tech", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bill_Gates_2018.jpg/800px-Bill_Gates_2018.jpg" },
    { name: "Mark Zuckerberg", category: "tech", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/800px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg" },
    { name: "Steve Jobs", category: "tech", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg" },

    // 🥊 SPORT (other)
    { name: "Conor McGregor", category: "sport", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Conor_McGregor_2019.jpg/800px-Conor_McGregor_2019.jpg" },
    { name: "Serena Williams", category: "sport", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Serena_Williams_at_the_2013_US_Open.jpg/800px-Serena_Williams_at_the_2013_US_Open.jpg" },
    { name: "Usain Bolt", category: "sport", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Usain_Bolt_by_Augustas_Didzgalvis_%28cropped%29.jpg/800px-Usain_Bolt_by_Augustas_Didzgalvis_%28cropped%29.jpg" },
    { name: "Roger Federer", category: "sport", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Roger_Federer_2018.jpg/800px-Roger_Federer_2018.jpg" }
  ]
};

module.exports = packs;
