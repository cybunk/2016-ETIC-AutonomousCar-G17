var matrix = [
  [0, 0, 2, 2, 0, 0, 2],
  [0, 6, 0, 0, 0, 0, 0],
  [2, 0, 0, 2, 2, 0, 0],
  [2, 0, 2, 0, 0, 2, 0],
  [0, 0, 6, 0, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 3],
  [3, 0, 0, 0, 0, 3, 0]
];
var labels = ["Constructeurs", "Equipementiers", "Etats", "Usagers", "ONGs", "Médias", "Chercheurs"];
var colors = ["#48926d", "#429941", "#28827d", "#0269d6", "#39914f", "#0974bf", "#54b02a"];
var content = [[0, 1, 3, 4, 5, 6], [7], [8, 9], [10, 13], [11], [12, 14], [16]];
var contentText = [["Google", "Propose les algorithmes de conduite les plus efficaces. Sa stratégie est de libérer du temps pour que les usagers puissent surfer davantages."],
                ["AKKA (avec dassault)", "Se donne un objectif à plus long terme, la conduite totalement automatisée et généralisée d’ici 15 à 20 ans, tout automatique, il y a la notion de véhicule de l’avenir."],
                ["Startup", "Expériences du type de services de taxis autonomes dans plusieurs villes."],
                ["Yamaha", "Travaille sur un projet de moto autonome."],
                ["Porsche et Lamborghini", "Opposés à la conduite autonome, ils n’ont pas de projets en cours de développement et revendiquent le plaisir de conduire."],
                ["Jaguar", "Opposés à la conduite totalement autonome, ils dénoncent les imperfections et les insécurités dans l’état de l’art des techniques de conduite autonome et proposent des avancées plus légère, de l’assistance sans autonomie complète, tout en ayant le même bagage technique que Tesla par exemple."],
                ["Tesla", "Parmi les premiers à proposer un fort niveau d’assistance de série, suivi de lignes blanche, détection d’obstacles... partisan de l’open source, Elon Musk envisage de devenir plus prudent en voyant les excès commis par les possesseurs de voitures autonomes : ils poussent le système à ses limites et essaient d’en dénoncer les failles. ”If something happens [with Autopilot], it could set the technology back a decade”."],
                ["Les Equipementiers", "Valeo avec Cruise4u permet de suivre les lignes droites sur plusieurs modèles actuels. Le but des constructeurs est d’augmenter le niveau de service comme depuis le debut de l’assistance à la conduite. Ceux qui sont pour avancent aussi des arguments relatifs la sécurité, notemment Volvo qui promet la fin des accidents, plus de morts ; ils sont prêts à assumer toute la responsabilité."],
                ["FBI", "Inquiétude vis a vis d’éventuels attentats à la google car."], 
                ["Les législateurs", "Certaines organisations supranationale au travers de la conférence de Vienne particulièrement, mais aussi la NHTSA, les cinqétats americains qui autorisent la conduite automatisée. Ces acteurs définissent la responsabilité en cas d’accident, et choisissent de légaliser ou non, les états en particulier ont une influence sur les infrastructures liées à la conduite comme les routes Ils déterminent la législation (traité de Vienne de 1968 par exemple) et l’appliquent, c’est l’entité de régulation, ils subissent la pression des constructeurs et doivent décider pour le plus grand bien notamment en terme de développement économique et de sécurité au volant. Il s’influencent mutuellement et tendent à prendre les mêmes décisions. Ils réfléchissent aussi en termes d’aménagements (routes adaptées, urbanisme)."],
                ["Le département des véhicules à moteur(DMC) de Californie", "A publié une série de recommandations aux sujets du déploiement des véhicules autonomes. Il prévoit notamment que les conducteurs disposent d’un permis de conduire spécifique ainsi que l’entière responsabilité leur soit incombée en cas d’accident et ce quand bien même ils ne contrˆoleraient pas le véhicule."],
                ["Les organisations supranationales", "ONU, UE. De la même fçon que les Etats, ils doivent réguler la controverse et ils ont une influence sur la législation."],
                ["Les cibles de sondage d’opinion", "Qu’ils soient conducteurs ou non et en Europe ou ailleurs, ils semblent partisans de la conduite autonome avec une majorité légère. Freiné par la mefiance, le manque de confiance dans le progrès technique et le plaisir de conduire, mais enthousiasmés par le gain de temps, une plus grande sécurité (ils font référence aux mauvais conducteurs) et l’idée de faire comme dans les films (Minority report, Total recall, IRobot, Le cinquième élément)."],
                ["Association de consommateurs comme Consumer Watchdog", "S’oppose à l’abandon du volant dans les prototypes développés par Google Car. Globalement opposé à l’absence de conducteur dans un véhicule."],
                ["Les médias", "Que ce soit dans les films ou les journaux télévisés, en ligne, papiers... Tf1 par exemple fait régulièrement un reportage sur l’avenir de l’automobile et présente la voiture autonome comme la ” révolution du transport ”. Les journaux et les analyses sur la conduite automatique posent aussi le problème de la responsabilité et de la gestion des accidents."],
                ["Acteurs marginaux", "Certains individus (Georges Hotz) bricolent leur voiture dans leur garage et communiquent, proposent un avis très spécialisé."],
                ["La recherche plus institutionnelle", "De nombreux laboratoires de recherche (Départements robotique, intelligence artificielle, informatique ou traitement d’image d’universités comme Stanford, MIT, Carnegie Mellon) s’enthousiasment au sujet de la voiture autonome, ils re ̧coivent des subventions, l’aide des constructeurs pour concrétiser le projet de voiture autonome. Leur enthousiasme a certainement sa source dans l’influence des medias."]];

var chord = d3.layout.chord()
    .padding(.05)
    .sortSubgroups(d3.descending)
    .matrix(matrix);

var dim = Math.min($(window).width() / 2, $(window).height()) - 10;
var margX = ($(window).width() / 2 > $(window).height()) ? ($(window).width()/2 - $(window).height()) / 2 : 0;
var margY = ($(window).width() / 2 < $(window).height()) ? ($(window).height() - $(window).width()/2) / 2 : 0;

var width = dim,
    height = dim,
    innerRadius = dim * .4,
    outerRadius = innerRadius * 1.1;

var fill = d3.scale.ordinal()
    .domain(d3.range(4))
    .range(colors);

var svg = d3.select("body").append("svg")
    .attr("width", $(window).width() / 2)
    .attr("height", $(window).height() - 10)
  .append("g")
    .attr("transform", "translate(" + (dim / 2 + margX) + "," + (dim / 2 + margY) + ")");

var bg = [{ "x_axis": 0, "y_axis": 0, "radius": innerRadius, "color" : "#EEEEEE" }];
var circle = svg.selectAll("circle")
    .data(bg)
  .enter().append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", innerRadius)
    .style("fill", "#333");

svg.append("g").selectAll("path")
    .data(chord.groups)
  .enter().append("path")
    .style("fill", function(d) { return fill(d.index); })
    .style("stroke", function(d) { return fill(d.index); })
    .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
    .on("mouseover", fade(.1))
    .on("mouseout", fade(1));

var ticks = svg.append("g").selectAll("g")
    .data(chord.groups)
  .enter().append("g").selectAll("g")
    .data(groupTicks)
  .enter().append("g")
    .attr("transform", function(d) {
      return "rotate(" + (d.angle * 180 / Math.PI - 100) + ")"
          + "translate(" + outerRadius + ",0)";
    });

ticks.append("text")
    .attr("x", 0)
    .attr("dy", "-10")
    .attr("transform", "rotate(100)translate(90)")
    .style("text-anchor", "end")
    .style("fill", "#EEEEEE")
    .text(function(d) { return d.label; })
    .attr("class", "labelTxt");

svg.append("g")
    .attr("class", "chord")
  .selectAll("path")
    .data(chord.chords)
  .enter().append("path")
    .attr("d", d3.svg.chord().radius(innerRadius))
    .style("fill", function(d) { return fill(d.target.index); })
    .style("opacity", 1);

// Returns an array of tick angles and labels, given a group.
function groupTicks(d) {
  return d3.range(0, d.value, 1000).map(function(v, i) {
    return {
      angle: (d.endAngle + d.startAngle) / 2,
      label: labels[d.index]
    };
  });
}

// Returns an event handler for fading a given chord group.
function fade(opacity) {
  return function(g, i) {
    svg.selectAll(".chord path")
        .filter(function(d) { return d.source.index != i && d.target.index != i; })
      .transition()
        .style("opacity", opacity);
      var desc = "";
      for (var i = 0; i < content[g.index].length; i++)
      {
        desc += "<div class=\"title\">";
        desc += contentText[content[g.index][i]][0];
        desc += "</div>";
        desc += contentText[content[g.index][i]][1];
      }
      $(".box").children(".title").text(labels[g.index]);
      $(".box").children(".desc").html(desc);
      console.log(g.index);
  };
}