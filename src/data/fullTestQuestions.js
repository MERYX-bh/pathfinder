// src/data/fullTestQuestions.js

/**
 * Chaque question :
 * - id: unique
 * - domain: étiquette du bloc (ÉNERGIE, INFORMATION, etc.)
 * - skill: petite sous-étiquette (Communication, Analyse, Leadership…)
 * - text: l'énoncé de la question
 * - options: tableau de 4 options (label + scoreKey)
 *
 * Les scoreKey alimentent 6 axes binaires :
 *   EI:   E (Extraversion) vs I (Introversion)           -> "energy"
 *   SN:   S (Sensing/détails) vs N (iNtuition/vision)    -> "information"
 *   TF:   T (Thinking/logique) vs F (Feeling/valeurs)    -> "decision"
 *   JP:   J (Judge/structuré) vs P (Perceive/flexible)    -> "organization"
 *   MO:   G (Goal mesurable) vs M (Meaning/impact)       -> "motivation"
 *   LP:   P (Practice) vs C (Concept)                    -> "learning"
 */

const Q = (id, domain, skill, text, opts) => ({
  id,
  domain,
  skill,
  text,
  options: opts.map((o) => ({
    label: o.label,
    scoreKey: o.key, // ex: "E","I","S","N","T","F","J","P","G","M","PRACT","CONC"
  })),
});

export const fullTestQuestions = [
  // ---- ÉNERGIE (EI) ---------------------------------------------------------
  Q(1, "ÉNERGIE", "Communication",
    "Quand vous rentrez d'une longue journée, vous préférez…",
    [
      { label: "Passer du temps seul(e) pour vous ressourcer", key: "I" },
      { label: "Retrouver quelques proches", key: "E" },
      { label: "Sortir et rencontrer du monde", key: "E" },
      { label: "Vous lancer dans une activité stimulante", key: "E" },
    ]
  ),
  Q(2, "ÉNERGIE", "Collaboration",
    "En réunion, votre tendance naturelle est de…",
    [
      { label: "Écouter, puis parler quand c’est pertinent", key: "I" },
      { label: "Animer la discussion et créer du lien", key: "E" },
      { label: "Observer les dynamiques du groupe", key: "I" },
      { label: "Stimuler l’énergie et décider rapidement", key: "E" },
    ]
  ),

  // ---- INFORMATION (SN) -----------------------------------------------------
  Q(3, "INFORMATION", "Analyse",
    "Face à un nouveau projet, votre première réaction est de…",
    [
      { label: "Examiner tous les détails et étapes concrètes", key: "S" },
      { label: "Visualiser les possibilités et l’impact global", key: "N" },
      { label: "Chercher des exemples similaires réussis", key: "S" },
      { label: "Imaginer une approche complètement nouvelle", key: "N" },
    ]
  ),
  Q(4, "INFORMATION", "Résolution de problème",
    "Quand une info manque, vous…",
    [
      { label: "Collectez des faits vérifiables", key: "S" },
      { label: "Faites des hypothèses pour avancer", key: "N" },
      { label: "Comparez plusieurs cas concrets", key: "S" },
      { label: "Projetez un scénario futur idéal", key: "N" },
    ]
  ),

  // ---- DÉCISION (TF) --------------------------------------------------------
  Q(5, "DÉCISION", "Leadership",
    "Quand vous devez prendre une décision importante, vous…",
    [
      { label: "Analysez logiquement les faits et données", key: "T" },
      { label: "Considérez l’impact sur les personnes concernées", key: "F" },
      { label: "Pesez rationnellement le pour et le contre", key: "T" },
      { label: "Suivez vos valeurs et votre cœur", key: "F" },
    ]
  ),
  Q(6, "DÉCISION", "Négociation",
    "Devant un désaccord tendu, vous privilégiez…",
    [
      { label: "Des critères objectifs et des métriques", key: "T" },
      { label: "La relation et le compromis gagnant-gagnant", key: "F" },
      { label: "La logique de coûts/bénéfices", key: "T" },
      { label: "L’empathie et l’écoute active", key: "F" },
    ]
  ),

  // ---- ORGANISATION (JP) ----------------------------------------------------
  Q(7, "ORGANISATION", "Organisation",
    "Votre environnement de travail idéal serait…",
    [
      { label: "Structuré avec des routines claires et planifiées", key: "J" },
      { label: "Flexible avec la liberté d’adapter au fur et à mesure", key: "P" },
      { label: "Avec des échéances précises à respecter", key: "J" },
      { label: "Ouvert aux opportunités et aux changements", key: "P" },
    ]
  ),
  Q(8, "ORGANISATION", "Livrables",
    "Devant une deadline, vous…",
    [
      { label: "Planifiez tôt et livrez en avance", key: "J" },
      { label: "Gardez de la marge pour itérer", key: "P" },
      { label: "Suivez une checklist détaillée", key: "J" },
      { label: "Restez agile jusqu’au dernier moment", key: "P" },
    ]
  ),

  // ---- MOTIVATION (MO) ------------------------------------------------------
  Q(9,  "MOTIVATION", "Créativité",
    "Ce qui vous motive le plus dans le travail, c’est…",
    [
      { label: "Atteindre des objectifs mesurables et concrets", key: "G" },
      { label: "Donner du sens et aider les autres", key: "M" },
      { label: "Développer une expertise reconnue", key: "G" },
      { label: "Avoir un impact positif sur le monde", key: "M" },
    ]
  ),
  Q(10, "MOTIVATION", "Carrière",
    "Sur 12–18 mois, vous voulez surtout…",
    [
      { label: "Monter des KPI solides et une promo", key: "G" },
      { label: "Construire un projet utile à une communauté", key: "M" },
      { label: "Prouver votre performance chiffrée", key: "G" },
      { label: "Sentir un alignement avec vos valeurs", key: "M" },
    ]
  ),

  // ---- APPRENTISSAGE (LP) ---------------------------------------------------
  Q(11, "APPRENTISSAGE", "Créativité",
    "Votre méthode d’apprentissage préférée est…",
    [
      { label: "Étape par étape avec des exemples concrets", key: "PRACT" },
      { label: "En reliant les concepts à la vision d’ensemble", key: "CONC" },
      { label: "Par la pratique et l’expérimentation", key: "PRACT" },
      { label: "En explorant librement les possibilités", key: "CONC" },
    ]
  ),
  Q(12, "APPRENTISSAGE", "Techniques",
    "Quand vous découvrez un nouvel outil, vous…",
    [
      { label: "Suivez un tuto et testez directement", key: "PRACT" },
      { label: "Lisez la doc pour bien comprendre le modèle", key: "CONC" },
      { label: "Copiez un exemple minimal qui marche", key: "PRACT" },
      { label: "Cartographiez les concepts avant d’essayer", key: "CONC" },
    ]
  ),

  // ---- MIX (on continue jusqu’à 20) -----------------------------------------
  Q(13, "COLLABORATION", "Communication",
    "Avec de nouveaux collègues, vous…",
    [
      { label: "Prenez le temps d’observer avant d’agir", key: "I" },
      { label: "Initiez des échanges informels rapidement", key: "E" },
      { label: "Cherchez des rituels concrets de travail", key: "S" },
      { label: "Imaginez des synergies originales", key: "N" },
    ]
  ),
  Q(14, "PROJECTION", "Analyse",
    "Face à une tendance marché incertaine, vous…",
    [
      { label: "Collectez des données terrain", key: "S" },
      { label: "Formulez des paris stratégiques", key: "N" },
      { label: "Montez un tableur comparatif", key: "T" },
      { label: "Consultez les parties prenantes clés", key: "F" },
    ]
  ),
  Q(15, "RHYTHME", "Organisation",
    "Votre cadence naturelle ressemble plutôt à…",
    [
      { label: "Régulière et planifiée", key: "J" },
      { label: "Intense par vagues créatives", key: "P" },
      { label: "Découpage hebdo très stable", key: "J" },
      { label: "Pics courts selon l’inspiration", key: "P" },
    ]
  ),
  Q(16, "ARBITRAGE", "Leadership",
    "Si deux options sont proches, vous tranchez…",
    [
      { label: "Avec un critère mesurable", key: "T" },
      { label: "Selon l’effet sur l’équipe", key: "F" },
      { label: "Par ROI attendu", key: "T" },
      { label: "Par cohésion et motivation", key: "F" },
    ]
  ),
  Q(17, "FOCUS", "Apprentissage",
    "Quand vous bloquez, vous…",
    [
      { label: "Testez plusieurs pistes rapidement", key: "PRACT" },
      { label: "Reprenez la théorie pour clarifier", key: "CONC" },
      { label: "Demandez un exemple de solution", key: "PRACT" },
      { label: "Reformulez le problème conceptuellement", key: "CONC" },
    ]
  ),
  Q(18, "IMPACT", "Motivation",
    "Le feedback qui vous booste le plus…",
    [
      { label: "Des chiffres : vélocité, objectifs, résultats", key: "G" },
      { label: "Le sens : utilité, gratitude, changement", key: "M" },
      { label: "Des repères d’excellence technique", key: "G" },
      { label: "La reconnaissance de l’aide apportée", key: "M" },
    ]
  ),
  Q(19, "STYLE", "Communication",
    "Votre style d’échange au quotidien est surtout…",
    [
      { label: "Direct et efficace", key: "T" },
      { label: "Chaleureux et inclusif", key: "F" },
      { label: "Synthétique et opérationnel", key: "S" },
      { label: "Inspirant et prospectif", key: "N" },
    ]
  ),
  Q(20, "DRIVE", "Organisation",
    "Quand tout s’accélère, vous…",
    [
      { label: "Resserrez le plan, priorisez, cadrez", key: "J" },
      { label: "Restez souple et captez les opportunités", key: "P" },
      { label: "Tenez le cap via des métriques", key: "T" },
      { label: "Gardez la cohésion humaine", key: "F" },
    ]
  ),
];

export default fullTestQuestions;
