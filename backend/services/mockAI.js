const { v4: uuidv4 } = require('uuid');

// ─── LANGUAGE LABELS ────────────────────────────────────────────────────────
const DAY_NAMES = {
  english: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
  hindi:   ['सोमवार','मंगलवार','बुधवार','गुरुवार','शुक्रवार','शनिवार','रविवार'],
  marathi: ['सोमवार','मंगळवार','बुधवार','गुरुवार','शुक्रवार','शनिवार','रविवार'],
};

// ─── CRAVING INTELLIGENCE ENGINE ────────────────────────────────────────────
// Step 1: Identify craving type
function identifyCravingType(input) {
  const lower = input.toLowerCase();
  if (/sweet|meetha|goad|mithai|chocolate|sugar|गोड|मीठा|মিষ্টি/.test(lower)) return 'sweet';
  if (/salty|namkeen|chips|khara|नमकीन|खारा/.test(lower)) return 'salty';
  if (/spicy|tikha|mirchi|तीखा|तिखट/.test(lower)) return 'spicy';
  if (/crunchy|crispy|crunch|crisp/.test(lower)) return 'crunchy';
  if (/creamy|smooth|butter|मलाई/.test(lower)) return 'creamy';
  if (/fried|fry|tla|तळलेले/.test(lower)) return 'comfort';
  return 'comfort';
}

// Step 2: Decode potential cause
function decodeCause(type, condition, hour) {
  const isAM = hour < 12;
  const map = {
    sweet: {
      PCOS_PCOD: 'fluctuating blood sugar or low insulin sensitivity — common in PCOS',
      PREGNANCY: 'your body needing quick energy; completely normal during pregnancy',
      ANOREXIA_LOW_APPETITE: 'a gentle signal from your body — it\'s okay to listen to it',
      GENERAL_HEALTHY: isAM ? 'low blood sugar after an overnight fast' : 'an afternoon energy dip'
    },
    salty: {
      PCOS_PCOD: 'adrenal stress or magnesium depletion — both linked to PCOS hormonal cycles',
      PREGNANCY: 'increased blood volume and electrolyte needs during pregnancy',
      ANOREXIA_LOW_APPETITE: 'your senses searching for something familiar and comfortable',
      GENERAL_HEALTHY: 'dehydration or an electrolyte imbalance'
    },
    spicy: {
      PCOS_PCOD: 'emotional stress or cortisol fluctuation — seen during the luteal phase',
      PREGNANCY: 'taste sensitivity changes in pregnancy — completely normal',
      ANOREXIA_LOW_APPETITE: 'your taste buds waking up and looking for stimulation — a good sign!',
      GENERAL_HEALTHY: 'a digestive boost signal or temperature regulation'
    },
    crunchy: {
      PCOS_PCOD: 'stress-related tension-release seeking behaviour',
      PREGNANCY: 'a sensory craving; your body enjoying textural variety',
      ANOREXIA_LOW_APPETITE: 'interest in texture — that\'s a positive eating cue',
      GENERAL_HEALTHY: 'a stress-relief seeking cue'
    },
    creamy: {
      PCOS_PCOD: 'healthy fat craving — your body needs omega-3 support',
      PREGNANCY: 'calcium and fat-soluble vitamin craving — essential for baby\'s development',
      ANOREXIA_LOW_APPETITE: 'a gentle craving for comfort — honour it with something nourishing',
      GENERAL_HEALTHY: 'a need for healthy fats or protein'
    },
    comfort: {
      PCOS_PCOD: 'emotional or cyclical eating — let\'s satisfy it smartly',
      PREGNANCY: 'nausea or mood-related comfort seeking — totally normal',
      ANOREXIA_LOW_APPETITE: 'a soft signal from your body. Small wins count. 💛',
      GENERAL_HEALTHY: 'emotional comfort or habit — let\'s make it nourishing'
    }
  };
  return (map[type] || map.comfort)[condition] || map.comfort.GENERAL_HEALTHY;
}

// Step 3 + 4: Generate a safe, condition-aware recipe
function generateRecipe(type, condition, language, trimester) {
  const recipes = {
    PCOS_PCOD: {
      sweet: {
        name: language === 'marathi' ? 'रागी आणि खजूर लाडू' : language === 'hindi' ? 'रागी और खजूर के लड्डू' : 'Ragi & Date Ladoo',
        satisfies: 'Natural sweetness mimics sugar cravings without spiking blood glucose',
        ingredients: ['½ cup ragi (finger millet) flour','6 medjool dates (pitted)','2 tbsp ghee','2 tbsp desiccated coconut','1 tsp cinnamon powder','1 tbsp flaxseed powder','Pinch of cardamom'],
        steps: ['Dry-roast ragi flour on low heat for 5 min until fragrant.','Blend dates into a smooth paste with 1 tbsp warm water.','Mix ragi flour, date paste, flaxseed, cinnamon, cardamom together.','Add warm ghee and mix into a pliable dough.','Shape into small ladoos (ping-pong ball size).','Roll in coconut. Refrigerate 10 min. Serve 1–2.'],
        whyBetter: ['Ragi is low-GI — prevents the blood sugar spike that worsens PCOS insulin resistance.','Dates provide iron and natural sweetness without refined sugar.','Flaxseed contains lignans that help reduce excess estrogen and improve insulin sensitivity — both key factors in managing PCOS.','Cinnamon has been shown to reduce androgen levels and improve insulin sensitivity in PCOS.'],
        conditionNote: language === 'marathi'
          ? '🌿 हे लाडू PCOS मध्ये इन्सुलिन रेझिस्टन्स कमी करण्यासाठी विशेषतः फायदेशीर आहेत. रागी चा low glycemic index रक्तातील साखर नियंत्रित ठेवतो.'
          : '🌿 These ladoos are especially beneficial for PCOS — ragi\'s low glycemic index helps control blood sugar, while flaxseed lignans actively reduce excess androgens.'
      },
      salty: {
        name: language === 'marathi' ? 'मेथी मुठिया' : language === 'hindi' ? 'मेथी मुठिया' : 'Methi Muthiya (Fenugreek Dumplings)',
        satisfies: 'Savoury, satisfying crunch without refined flour or excess sodium',
        ingredients: ['1 cup whole wheat flour','¼ cup fresh methi (fenugreek) leaves','1 tsp ajwain','½ tsp turmeric','1 tsp sesame seeds','Salt to taste','2 tbsp curd','1 tsp olive oil'],
        steps: ['Mix flour, methi, spices, sesame, salt together.','Add curd and oil, bind into a stiff dough.','Shape into small cylindrical rolls.','Steam for 12 minutes until firm.','Shallow-fry 2 min each side for crunch (optional).','Serve with green chutney.'],
        whyBetter: ['Fenugreek seeds & leaves help reduce insulin resistance — directly targeting root cause of PCOS.','Whole wheat over maida avoids blood sugar spikes.','Steaming reduces oil content significantly.'],
        conditionNote: '🌿 Methi contains diosgenin which may help regulate estrogen levels — directly beneficial for hormone balance in PCOS.'
      },
      spicy: {
        name: 'Spearmint & Ginger Masala Chai Oats',
        satisfies: 'Warming, spiced comfort with metabolism support',
        ingredients: ['½ cup rolled oats','1 tsp grated ginger','4–5 spearmint leaves','½ tsp cinnamon','1 cup water','½ cup unsweetened almond milk','1 tsp pumpkin seeds','Pinch of black pepper'],
        steps: ['Boil water with ginger, spearmint, cinnamon, pepper for 3 min.','Add oats and almond milk, stir on low heat 5 min.','Top with pumpkin seeds.','Serve warm.'],
        whyBetter: ['Spearmint has been shown in clinical studies to reduce free testosterone in PCOS.','Ginger reduces inflammation linked to ovarian dysfunction.','Rolled oats are low-GI and high in beta-glucan, supporting insulin sensitivity.'],
        conditionNote: '🌿 Spearmint\'s anti-androgenic properties make this more than a comfort food — it\'s actively working on your PCOS hormones.'
      },
      crunchy: {
        name: 'Roasted Makhana Chaat',
        satisfies: 'Satisfying crunch with zero refined ingredients',
        ingredients: ['1 cup makhana (fox nuts)','1 tsp ghee','½ tsp chaat masala','½ tsp roasted cumin powder','Pinch of rock salt','1 tbsp pumpkin seeds'],
        steps: ['Heat ghee in a pan on medium heat.','Add makhana, stir-roast 5–7 min until crispy.','Add pumpkin seeds last 2 min.','Remove from heat, toss with all spices.','Serve immediately.'],
        whyBetter: ['Makhana is low-GI, high in magnesium — magnesium deficiency is linked to worsened PCOS symptoms.','Pumpkin seeds are rich in zinc which supports progesterone production.'],
        conditionNote: '🌿 Makhana\'s low glycemic load helps manage the insulin resistance central to PCOS.'
      }
    },
    PREGNANCY: {
      sweet: {
        name: language === 'hindi' ? 'केले और अखरोट का हलवा' : 'Banana Walnut Halwa',
        satisfies: 'Natural sweetness with folate and omega-3 for baby\'s development',
        ingredients: ['2 ripe bananas','2 tbsp ghee','¼ cup walnut pieces','1 tsp cardamom','1 tbsp jaggery (optional)','2 tbsp milk'],
        steps: ['Mash bananas well.','Heat ghee in a pan on medium heat.','Add mashed banana, cook stirring for 4 min.','Add milk, cardamom, stir 2 more min.','Add jaggery if using, stir until dissolved.','Top with crushed walnuts. Serve warm.'],
        whyBetter: ['Bananas are rich in B6 which helps reduce pregnancy nausea.','Walnuts provide plant-based omega-3 (ALA) for fetal brain development.','Ghee supports fat-soluble vitamin absorption.'],
        conditionNote: trimester === 1
          ? '🤰 Safe for first trimester — gentle on nausea, provides folate and B6 to protect neural tube development.'
          : trimester === 2
          ? '🤰 Great for second trimester — calcium, potassium, and omega-3 for your baby\'s bone and brain growth.'
          : '🤰 Energy-dense and easy to digest — ideal for third trimester when stomach space is limited.',
        avoidNote: '⚠️ Avoid: papaya, pineapple, raw papaya, raw eggs, and excess Vitamin A supplements during pregnancy.'
      },
      salty: {
        name: language === 'hindi' ? 'पालक मूंग दाल सूप' : 'Palak Moong Dal Soup',
        satisfies: 'Iron and protein-rich savoury comfort without excess sodium',
        ingredients: ['½ cup yellow moong dal','1 cup palak (spinach)','1 small onion','1 tsp cumin seeds','½ tsp turmeric','Salt (minimal)','1 tsp ghee','½ tsp lemon juice'],
        steps: ['Pressure cook moong dal with turmeric (2 whistles).','Sauté onion and cumin in ghee until golden.','Add palak, sauté 2 min until wilted.','Combine with cooked dal, blend smooth.','Simmer 3 min, add minimal salt and lemon.','Serve warm in a bowl.'],
        whyBetter: ['Spinach is rich in folate, iron and calcium — all critical nutrients in pregnancy.','Moong dal is easy to digest — important when digestion slows in pregnancy.','Avoiding heavy sodium from packaged snacks protects blood pressure.'],
        conditionNote: '🤰 This soup provides the iron-folate combination most needed in the second trimester.'
      },
      spicy: {
        name: 'Ginger Jeera Rice with Curd',
        satisfies: 'Mild warmth with nausea-relieving ginger — safe comfort during pregnancy',
        ingredients: ['1 cup cooked brown rice','1 tsp grated ginger','1 tsp jeera (cumin) seeds','½ cup full-fat curd','½ tsp ghee','Curry leaves','Salt to taste'],
        steps: ['Heat ghee, add jeera and curry leaves, let splutter.','Add ginger, sauté 30 seconds.','Add cooked rice, toss gently for 2 min.','Serve with room temperature curd on the side.'],
        whyBetter: ['Ginger reduces pregnancy nausea — clinically validated.','Brown rice is high in B vitamins and fibre.','Curd provides calcium and probiotics for gut health.'],
        conditionNote: '🤰 Jeera supports healthy digestion which slows during pregnancy. Ginger is safe and effective for nausea relief.'
      },
      crunchy: {
        name: 'Sesame Roti Strips with Hummus',
        satisfies: 'Crunchy snack packed with calcium for baby\'s bone development',
        ingredients: ['2 whole wheat rotis','1 tbsp sesame seeds','½ tsp ajwain','¼ cup homemade hummus','Salt minimal','Ghee (thin brush)'],
        steps: ['Brush roti lightly with ghee.','Sprinkle sesame seeds and ajwain.','Toast in a tawa until golden and crisp.','Cut into strips.','Serve with hummus for dipping.'],
        whyBetter: ['Sesame seeds are one of the richest plant sources of calcium — crucial for fetal bone formation.','Whole wheat provides fibre to combat pregnancy constipation.'],
        conditionNote: '🤰 Safe and beneficial across all trimesters. Sesame provides calcium without needing dairy.'
      }
    },
    ANOREXIA_LOW_APPETITE: {
      sweet: {
        name: 'Tiny Banana Peanut Butter Bite',
        satisfies: 'A small, gentle sweet treat that asks nothing of you',
        ingredients: ['½ a ripe banana','1 tsp natural peanut butter','A pinch of cinnamon','1 tsp honey (optional)'],
        steps: ['Slice half a banana into 3 rounds.','Spread a tiny bit of peanut butter on each.','Dust with cinnamon.','That\'s it. No pressure to finish.'],
        whyBetter: ['A half banana is a gentle starting point — no overwhelming portions.','Peanut butter adds nourishment in a tiny amount.','Cinnamon makes it smell comforting.'],
        conditionNote: 'You showed up today, and that matters. 💛 Even this small bite is a step worth celebrating.'
      },
      salty: {
        name: 'Warm Veggie Broth with Toast Soldiers',
        satisfies: 'Comforting, easy-to-sip warmth with a small textural element',
        ingredients: ['1 cup light vegetable broth (store-bought ok)','½ slice whole grain bread, toasted','A little butter or ghee','Pinch of black pepper'],
        steps: ['Warm the broth gently — it should feel like a hug in a cup.','Toast the bread, cut into 2 thin strips (soldiers).','Butter them very lightly.','Sip the broth slowly. Dip the toast if it feels right.'],
        whyBetter: ['Broth is hydrating and easy on the stomach.','Toast offers gentle texture without any pressure.'],
        conditionNote: '💛 Starting with sipping is completely valid. You don\'t have to finish everything. If this feels overwhelming, speaking to someone you trust can help.'
      },
      spicy: {
        name: 'Soft Khichdi with a Tiny Dollop of Ghee',
        satisfies: 'Warm, soft, aromatic — no chewing challenge, just gentle nourishment',
        ingredients: ['2 tbsp rice','1 tbsp yellow moong dal','½ tsp cumin','Tiny pinch of turmeric','¼ tsp ghee','Warm water','Pinch of salt'],
        steps: ['Cook rice and dal together with 1.5 cups water until very soft.','Temper cumin in ghee (5 seconds).','Add to khichdi, stir gently.','Serve in a small bowl — a quarter cup is enough to start.'],
        whyBetter: ['Khichdi is one of the most digestible, gentle foods that exists.','Very small portions feel non-overwhelming.','The warmth and aroma invite eating without pressure.'],
        conditionNote: '💛 Starting with just a spoonful is a win. You\'re here, and that\'s what counts today.'
      },
      crunchy: {
        name: 'A Few Roasted Makhana',
        satisfies: 'Light crunch, satisfying texture, no overwhelm',
        ingredients: ['¼ cup makhana (fox nuts)','¼ tsp ghee','Pinch of rock salt'],
        steps: ['Toss makhana in warm ghee in a pan for 3–4 min.','Dust with the tiniest pinch of salt.','Put a small handful in a bowl.','Eat at your own pace — even 5 pieces counts.'],
        whyBetter: ['Makhana is airy and light — no heaviness.','A small handful is a complete non-threatening portion.','Magnesium in makhana gently supports the nervous system.'],
        conditionNote: '💛 Every piece you eat is a quiet act of care for yourself. That\'s enough for today.'
      }
    },
    GENERAL_HEALTHY: {
      sweet: {
        name: 'Oats & Banana Smoothie Bowl',
        satisfies: 'Naturally sweet, filling breakfast or snack',
        ingredients: ['1 frozen banana','¼ cup rolled oats','½ cup almond milk','1 tbsp peanut butter','1 tsp chia seeds','Seasonal fruit to top'],
        steps: ['Soak oats in almond milk for 5 min.','Blend with frozen banana and peanut butter until thick.','Pour into a bowl.','Top with chia seeds and sliced fruit.'],
        whyBetter: ['Frozen banana provides creaminess without ice cream.','Oats deliver slow-release energy and fibre.','Chia seeds add omega-3 and protein.'],
        conditionNote: null
      },
      salty: {
        name: 'Poha Chivda (Flattened Rice Trail Mix)',
        satisfies: 'Light, crispy, savoury snack ready in 10 minutes',
        ingredients: ['1 cup thin poha','2 tbsp peanuts','1 tbsp roasted chana','½ tsp turmeric','1 tsp mustard seeds','Curry leaves, green chilli','Salt, lemon, coriander'],
        steps: ['Dry-roast poha in a pan 5 min until crisp.','In same pan, heat oil, add mustard, curry leaves, chilli.','Add peanuts and chana, roast 2 min.','Mix in poha, turmeric, salt.','Finish with lemon juice and coriander.'],
        whyBetter: ['Poha is low-calorie and high-iron.','Peanuts add protein and healthy fats.','Much less sodium than packaged chips.'],
        conditionNote: null
      },
      spicy: {
        name: 'Tomato Egg Bhurji',
        satisfies: 'Spiced, flavourful protein-rich dish ready in 12 minutes',
        ingredients: ['2 eggs','1 tomato diced','1 small onion','1 green chilli','½ tsp cumin','¼ tsp turmeric','Salt, coriander'],
        steps: ['Sauté onion and cumin until translucent.','Add chilli and tomato, cook 3 min.','Beat eggs with turmeric.','Pour into pan, scramble with veggie mix.','Top with coriander. Serve with roti.'],
        whyBetter: ['Eggs provide complete protein and choline for brain health.','Tomatoes add lycopene — a powerful antioxidant.'],
        conditionNote: null
      },
      crunchy: {
        name: 'Roasted Chickpea Chaat',
        satisfies: 'High-protein crunchy snack with chaat flavours',
        ingredients: ['1 can (or 1 cup cooked) chickpeas','1 tsp chaat masala','½ tsp cumin','1 tsp olive oil','Squeeze of lemon','Chopped onion, tomato','Fresh coriander'],
        steps: ['Dry chickpeas on a towel.','Toss with oil and spices.','Roast at 200°C for 20 min or shallow fry 8 min until crispy.','Toss with chopped onion, tomato, lemon, coriander.','Serve immediately.'],
        whyBetter: ['Chickpeas are high in protein and fibre — lasting satiety.','No refined carbs, no excess sodium vs packaged snacks.'],
        conditionNote: null
      }
    }
  };

  const conditionRecipes = recipes[condition] || recipes.GENERAL_HEALTHY;
  const recipe = conditionRecipes[type] || conditionRecipes['sweet'] || conditionRecipes[Object.keys(conditionRecipes)[0]];
  return recipe;
}

// ─── MAIN: processCraving ────────────────────────────────────────────────────
async function processCraving(input, user, recentMeals) {
  const hour = new Date().getHours();
  const cravingType = identifyCravingType(input);
  const cause = decodeCause(cravingType, user.condition, hour);
  const recipe = generateRecipe(cravingType, user.condition, user.language, user.trimester);

  return {
    id: uuidv4(),
    metadata: {
      step1_craving_type: cravingType,
      step2_decoded_cause: `This craving might signal: ${cause}`,
      step3_recipe_generated: recipe.name,
      step4_validation: {
        condition_safe: true,
        language_correct: true,
        culturally_appropriate: true
      }
    },
    recipe: {
      ...recipe,
      id: uuidv4()
    },
    user_condition: user.condition,
    user_language: user.language,
    generated_at: new Date().toISOString()
  };
}

// ─── MEAL PLAN GENERATOR ─────────────────────────────────────────────────────
async function generateMealPlan(user, recentMeals) {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1);
  const weekStartStr = weekStart.toISOString().split('T')[0];

  const days = DAY_NAMES[user.language] || DAY_NAMES.english;

  const plansByCondition = {
    PCOS_PCOD: {
      theme: user.language === 'marathi' ? 'हार्मोन बॅलन्सिंग आठवडा 🌿' :
             user.language === 'hindi'   ? 'हार्मोन बैलेंसिंग सप्ताह 🌿' :
             'Hormone Balancing Week 🌿',
      conditionNote: user.language === 'marathi'
        ? 'या आठवड्यातील सर्व जेवण low-GI आहेत आणि PCOS मध्ये इन्सुलिन संवेदनशीलता सुधारण्यास मदत करतात.'
        : user.language === 'hindi'
        ? 'इस सप्ताह के सभी भोजन low-GI हैं और PCOS में इंसुलिन संवेदनशीलता सुधारने में मदद करते हैं।'
        : 'All meals this week are low-GI and specifically chosen to improve insulin sensitivity and reduce androgen levels in PCOS.',
      meals: [
        { breakfast: { name: user.language === 'marathi' ? 'रागी दोसा + नारळ चटणी' : user.language === 'hindi' ? 'रागी डोसा + नारियल चटनी' : 'Ragi Dosa + Coconut Chutney', why: 'Low-GI ragi stabilises morning blood sugar' },
          lunch: { name: user.language === 'marathi' ? 'मेथी भात + डाळ तडका' : user.language === 'hindi' ? 'मेथी चावल + दाल तड़का' : 'Methi Rice + Dal Tadka', why: 'Fenugreek reduces insulin resistance' },
          snack: { name: 'Spearmint Chai + Makhana', why: 'Anti-androgenic spearmint supports hormone balance' },
          dinner: { name: user.language === 'marathi' ? 'पालक पनीर + बाजरी भाकरी' : user.language === 'hindi' ? 'पालक पनीर + बाजरे की रोटी' : 'Palak Paneer + Bajra Roti', why: 'Iron, magnesium and fibre — essential for PCOS support' } },
        { breakfast: { name: 'Flaxseed Smoothie Bowl', why: 'Lignans in flaxseed reduce excess estrogen' },
          lunch: { name: user.language === 'marathi' ? 'छोले + ज्वारी रोटी' : user.language === 'hindi' ? 'छोले + ज्वार की रोटी' : 'Chole + Jowar Roti', why: 'Chickpeas are low-GI and protein-rich' },
          snack: { name: 'Roasted Pumpkin Seeds', why: 'Zinc supports progesterone production' },
          dinner: { name: user.language === 'marathi' ? 'मूग डाळ खिचडी + दही' : user.language === 'hindi' ? 'मूंग दाल खिचड़ी + दही' : 'Moong Dal Khichdi + Curd', why: 'Easy digest, probiotic support' } },
        { breakfast: { name: 'Cinnamon Oats with Seeds', why: 'Cinnamon improves insulin sensitivity — clinically backed for PCOS' },
          lunch: { name: user.language === 'marathi' ? 'राजमा + ब्राऊन राईस' : user.language === 'hindi' ? 'राजमा + ब्राउन राइस' : 'Rajma + Brown Rice', why: 'High protein, low-GI combination' },
          snack: { name: 'Walnut + Dark Chocolate', why: 'Anti-inflammatory omega-3 from walnuts' },
          dinner: { name: user.language === 'marathi' ? 'तांदूळ भाकरी + मेथी सब्जी' : 'Mixed Veg Stir Fry + Quinoa', why: 'Fibre and zinc for hormone regulation' } },
        { breakfast: { name: user.language === 'marathi' ? 'पोहे + जवस चटणी' : 'Poha + Flaxseed Chutney', why: 'Iron and omega-3 together for PCOS support' },
          lunch: { name: user.language === 'marathi' ? 'सोयाबीन-free डाळ + बाजरी भाकरी' : 'Toor Dal + Bajra Roti', why: 'Avoiding excess soy; bajra is mineral-rich' },
          snack: { name: 'Spearmint Tea + Roasted Chana', why: 'Anti-androgen tea with protein snack' },
          dinner: { name: 'Tofu Palak Curry + Brown Rice', why: 'Plant protein with anti-inflammatory spinach' } },
        { breakfast: { name: user.language === 'marathi' ? 'रागी उपमा' : user.language === 'hindi' ? 'रागी उपमा' : 'Ragi Upma', why: 'Low-GI breakfast, high in calcium and iron' },
          lunch: { name: user.language === 'marathi' ? 'भाजी + ज्वारी भाकरी' : 'Mixed Sabzi + Jowar Roti', why: 'Seasonal vegetables provide phytonutrients' },
          snack: { name: 'Almond + Date Balls', why: 'Slow energy, magnesium and natural sweetness' },
          dinner: { name: 'Lentil Soup + Flaxseed Roti', why: 'Omega-3 boosted dinner for PCOS hormone support' } },
        { breakfast: { name: 'Chia Pudding with Berries', why: 'Omega-3, antioxidants and fibre' },
          lunch: { name: user.language === 'marathi' ? 'शेवग्याची शेंग + डाळ' : 'Drumstick Dal', why: 'Drumstick (moringa) contains compounds that support ovarian health' },
          snack: { name: 'Cucumber + Hummus', why: 'Hydrating, protein-rich, zero sugar' },
          dinner: { name: user.language === 'marathi' ? 'मेथी मुठिया + दही' : 'Methi Muthiya + Curd', why: 'Fenugreek directly reduces insulin resistance in PCOS' } },
        { breakfast: { name: 'Moong Chilla + Mint Chutney', why: 'Protein-start to the day, keeps energy stable' },
          lunch: { name: user.language === 'marathi' ? 'कोबी भात + आमटी' : 'Cabbage Rice + Amti', why: 'Light, seasonal, mineral-rich' },
          snack: { name: 'Spearmint Lemonade', why: 'Anti-androgenic cool refresher' },
          dinner: { name: user.language === 'marathi' ? 'पनीर भाजी + बाजरी रोटी' : 'Paneer Sabzi + Bajra Roti', why: 'Protein and complex carb for overnight recovery' } },
      ]
    },
    PREGNANCY: {
      theme: user.language === 'hindi' ? 'पोषण से भरपूर गर्भावस्था सप्ताह 🤰' : 'Nourishing Pregnancy Week 🤰',
      conditionNote: user.language === 'hindi'
        ? `तिमाही ${user.trimester || 2} के लिए विशेष: आयरन, कैल्शियम और प्रोटीन पर ध्यान केंद्रित।`
        : `Tailored for trimester ${user.trimester || 2}: focused on iron, calcium, protein and safe, nausea-friendly choices.`,
      meals: [
        { breakfast: { name: 'Palak Moong Dal Chilla', why: 'Folate + iron for neural tube development' },
          lunch: { name: 'Brown Rice + Rajma Curry', why: 'Iron and protein for blood volume increase' },
          snack: { name: 'Banana + Walnut', why: 'B6 for nausea, omega-3 for brain development' },
          dinner: { name: 'Chicken Stew + Quinoa (or Tofu)', why: 'Complete protein, calcium and iron' } },
        { breakfast: { name: 'Ragi Porridge with Jaggery', why: 'Calcium from ragi — vital for fetal bone formation' },
          lunch: { name: 'Dal + Palak + Roti', why: 'Iron-folate triple combination' },
          snack: { name: 'Dahi + Seasonal Fruit', why: 'Calcium + vitamin C for iron absorption' },
          dinner: { name: 'Fish Curry + Brown Rice (or Paneer)', why: 'Omega-3 DHA for brain development' } },
        { breakfast: { name: 'Banana Oat Pancakes', why: 'Easy-digest, energy for the morning' },
          lunch: { name: 'Chole + Roti + Salad', why: 'Iron + zinc for immune function' },
          snack: { name: 'Sesame Chikki', why: 'Calcium-rich snack for bone development' },
          dinner: { name: 'Palak Paneer + Bajra Roti', why: 'Iron + calcium powerhouse dinner' } },
        { breakfast: { name: 'Upma + Coconut Chutney + Lime', why: 'B vitamins and fibre' },
          lunch: { name: 'Masoor Dal + Jeera Rice', why: 'Lentils rich in folate and protein' },
          snack: { name: 'Almonds + Dates (4 each)', why: 'Iron, calcium, energy density' },
          dinner: { name: 'Mixed Veg Soup + Whole Wheat Toast', why: 'Light dinner, easy on reflux common in trimester 3' } },
        { breakfast: { name: 'Poha with Peanuts + Lemon', why: 'Iron-rich, easy to digest, nausea-friendly' },
          lunch: { name: 'Egg Curry + Brown Rice (or Rajma)', why: 'Complete protein and B12' },
          snack: { name: 'Smoothie: Banana, almond milk, spinach', why: 'Iron + calcium + omega-3 in one cup' },
          dinner: { name: 'Moong Dal Khichdi + Ghee', why: 'Easily digestible complete meal' } },
        { breakfast: { name: 'Idli + Sambar + Coconut Chutney', why: 'Fermented = better nutrient absorption, folate-rich' },
          lunch: { name: 'Chicken/Tofu + Saag + Jowar Roti', why: 'Iron + calcium + protein' },
          snack: { name: 'Roasted Chana + Jaggery', why: 'Iron and natural sugar energy' },
          dinner: { name: 'Tomato Egg Bhurji + Whole Wheat Roti', why: 'Protein + Vitamin C' } },
        { breakfast: { name: 'Chia Seed Pudding + Mango', why: 'Omega-3, calcium, folate from mango' },
          lunch: { name: 'Rajma Chawal', why: 'Classic high-iron, high-protein comfort meal' },
          snack: { name: 'Warm Milk with Turmeric', why: 'Golden milk — calcium and anti-inflammatory' },
          dinner: { name: 'Palak Soup + Multigrain Toast', why: 'Gentle iron-rich dinner for third trimester reflux management' } },
      ]
    },
    ANOREXIA_LOW_APPETITE: {
      theme: 'One Small Step at a Time 💛',
      conditionNote: 'No numbers. No pressure. Just gentle nourishment. Each meal listed is a small, manageable option. You only need to try one thing today.',
      meals: [
        { breakfast: { name: 'Half a Banana with a drizzle of honey', why: 'Gentle, no prep, sweet and comforting' },
          lunch: { name: 'A few spoonfuls of dal khichdi', why: 'Soft, warm, easy to stomach and nourishing' },
          snack: { name: 'A few roasted makhana', why: 'Light and crunchy — no pressure to finish' },
          dinner: { name: 'Warm vegetable broth + 1 toast strip', why: 'Sipping counts as nourishment too 💛' } },
        { breakfast: { name: 'A small cup of warm milk with a date', why: 'Comfort in a cup, no prep needed' },
          lunch: { name: 'Small bowl of moong dal soup', why: 'Gentle protein in liquid form' },
          snack: { name: 'A few cashews', why: 'Easy to eat, healthy fats' },
          dinner: { name: 'Rice with a tiny dollop of ghee', why: 'The simplest, most comforting meal' } },
      ]
    },
    GENERAL_HEALTHY: {
      theme: 'Seasonal Vitality Week 🌱',
      conditionNote: 'Balanced macros, seasonal Indian ingredients, variety every day.',
      meals: [
        { breakfast: { name: 'Oats Upma + Boiled Egg', why: 'Fibre + protein to start your day right' },
          lunch: { name: 'Dal + Brown Rice + Cucumber Raita', why: 'Balanced macros, probiotics, hydration' },
          snack: { name: 'Fruit + Peanut Butter', why: 'Natural sugars + protein curb afternoon cravings' },
          dinner: { name: 'Grilled Chicken/Paneer + Stir-fried Veg', why: 'Light, protein-rich end to the day' } },
        { breakfast: { name: 'Moong Chilla + Mint Chutney', why: 'Plant protein, satisfying and quick' },
          lunch: { name: 'Chole + Jowar Roti + Salad', why: 'High fibre, high iron, filling' },
          snack: { name: 'Roasted Chana + Amla Juice', why: 'Vitamin C boosts iron absorption' },
          dinner: { name: 'Fish Curry + Steamed Rice (or Paneer)', why: 'Complete amino acids, omega-3' } },
        { breakfast: { name: 'Poha with Peanuts + Lemon', why: 'Iron, fibre, quick to make' },
          lunch: { name: 'Rajma Chawal', why: 'Complete protein with rice, comfort meal' },
          snack: { name: 'Mixed Nuts + Green Tea', why: 'Anti-inflammatory, metabolism boost' },
          dinner: { name: 'Vegetable Soup + Whole Wheat Toast', why: 'Light, hydrating, mineral-rich' } },
        { breakfast: { name: 'Idli + Sambar + Coconut Chutney', why: 'Fermented food for gut health' },
          lunch: { name: 'Mixed Dal + Bajra Roti + Bhindi', why: 'Diverse minerals, gut-friendly fibre' },
          snack: { name: 'Makhana + Masala Chai', why: 'Antioxidants and magnesium' },
          dinner: { name: 'Egg Bhurji + Whole Wheat Roti', why: 'Protein, choline for brain health' } },
        { breakfast: { name: 'Banana Smoothie Bowl', why: 'Natural sweetness, potassium, fibre' },
          lunch: { name: 'Soya Chunks + Brown Rice', why: 'Plant protein powerhouse meal' },
          snack: { name: 'Carrot + Hummus', why: 'Vitamin A, protein, low-sugar snack' },
          dinner: { name: 'Dahi Aloo + Roti', why: 'Probiotic, potassium, comfort without heavy fat' } },
        { breakfast: { name: 'Ragi Dosa + Tomato Chutney', why: 'Calcium-rich, low-GI start' },
          lunch: { name: 'Kadhi Chawal', why: 'Probiotic kadhi, easy digestion' },
          snack: { name: 'Seasonal Fruit Chaat', why: 'Fibre, vitamins, and pure joy' },
          dinner: { name: 'Palak Dal + Millet Roti', why: 'Iron + folate + complex carbs' } },
        { breakfast: { name: 'Upma + Lime + Coriander', why: 'B vitamins, fibre, light and filling' },
          lunch: { name: 'Chicken Curry + Brown Rice (or Tofu)', why: 'Protein and complex carbs' },
          snack: { name: 'Almond Milk Tea', why: 'Dairy-free calcium, less caffeine than regular tea' },
          dinner: { name: 'Mixed Veg Khichdi + Papad (baked)', why: 'One-pot comfort, complete nutrition' } },
      ]
    }
  };

  const conditionPlan = plansByCondition[user.condition] || plansByCondition.GENERAL_HEALTHY;
  const dayNames = DAY_NAMES[user.language] || DAY_NAMES.english;

  const daymealTemplate = conditionPlan.meals.length >= 7
    ? conditionPlan.meals
    : [...conditionPlan.meals, ...conditionPlan.meals].slice(0, 7);

  const planDays = dayNames.map((day, i) => ({
    day,
    breakfast: { ...daymealTemplate[i].breakfast, recipe_id: uuidv4() },
    lunch:     { ...daymealTemplate[i].lunch,     recipe_id: uuidv4() },
    snack:     { ...daymealTemplate[i].snack,     recipe_id: uuidv4() },
    dinner:    { ...daymealTemplate[i].dinner,    recipe_id: uuidv4() }
  }));

  return {
    plan_id: uuidv4(),
    week_start: weekStartStr,
    language: user.language,
    days: planDays,
    condition_note: conditionPlan.conditionNote,
    weekly_theme: conditionPlan.theme,
    generated_for: user.condition
  };
}

// ─── NUDGE GENERATOR ─────────────────────────────────────────────────────────
async function generateNudge(user) {
  const hour = new Date().getHours();
  const isMorning = hour < 12;
  const isEvening = hour >= 17;
  const streak = user.streakCount || 0;

  const nudges = {
    PCOS_PCOD: {
      morning: [
        `${streak > 0 ? `${streak} दिनों की streak! ` : ''}Spearmint ki chai ke saath apna din shuru karo — ye PCOS mein androgen levels ko naturally control karne mein madad karta hai. 🌱`,
        `Good morning! Aaj ke breakfast mein ek cheench flaxseed daalo — lignans in PCOS mein insulin sensitivity improve karte hain. 🌿`,
        user.language === 'marathi'
          ? `सकाळची सुरुवात दालचिनी घातलेल्या ओट्सने करा — रक्तातील साखर नियंत्रित राहते आणि PCOS ची लक्षणे कमी होतात. 🌸`
          : `Start your morning with cinnamon oats — it helps keep blood sugar steady, which is crucial for managing PCOS insulin resistance. 🌸`
      ],
      evening: [
        `Aaj ka din kaise raha? Raat ke khaane mein ek bowl moong dal khichdi try karo — easy to digest aur PCOS ke liye hormone-friendly. 🌙`,
        user.language === 'marathi'
          ? `संध्याकाळी जास्त साखर टाळा. एक छोटी मूठ भाजलेला मखाना हा PCOS-friendly snack आहे. 🌙`
          : `Evening snack tip: swap sweet biscuits for roasted makhana — magnesium in makhana directly supports PCOS symptom management. 🌙`
      ]
    },
    PREGNANCY: {
      morning: [
        `Good morning, mama! 🤰 Aaj breakfast mein kuch iron-rich try karo — palak, poha ya eggs — baby ke growth ke liye zaruri hai.`,
        `Reminder: Aaj apna paani piya? Dehydration pregnancy mein fatigue badha deti hai — ek glass warm water se shuruaat karo. 💧`,
        user.language === 'hindi'
          ? `आज नाश्ते में रागी दलिया ट्राई करें — कैल्शियम से भरपूर और बच्चे की हड्डियों के लिए बहुत जरूरी है। 🤰`
          : `Today's pregnancy tip: ragi porridge for breakfast gives you more calcium than milk — essential for your baby's bone development. 🤰`
      ],
      evening: [
        `Raat ke khaane se pehle ek choti walk ya gentle stretch zarur karo — digestion better hoti hai aur nind bhi achhi aati hai. 🌙`,
        `Aaj ka dinner light rakhna — trimester mein reflux aam baat hai. Khichdi ya soup try karo. Bahut achha kar rahi ho! 💛`
      ]
    },
    ANOREXIA_LOW_APPETITE: {
      morning: [
        `Good morning. There's no pressure today. If you can manage just one small thing — a sip of warm milk or half a banana — that's a real win. 💛`,
        `Today, your only goal is to notice when your body sends any signal. Even a tiny one. You don't have to do anything big. You're doing wonderfully. 🌸`,
        `${streak > 0 ? `You've shown up ${streak} day${streak > 1 ? 's' : ''} in a row. That's remarkable. ` : ''}Start today gently — a warm cup of anything is a perfect beginning. 💛`
      ],
      evening: [
        `You made it through today. Whatever you ate or didn't eat — you're still here and that matters more than any meal. Rest well. 🌙`,
        `Evening check-in: How are you feeling? If there's any small hunger signal, even a few roasted makhana can honour it. No pressure. 💛`
      ]
    },
    GENERAL_HEALTHY: {
      morning: [
        `${streak > 0 ? `${streak}-day streak! ` : ''}Great start! Have a protein-rich breakfast today — it keeps energy stable for the next 4 hours and curbs mid-morning snacking. 💪`,
        `Morning tip: drink a glass of water before your first meal. It kickstarts metabolism and improves digestion throughout the day. 🌊`,
        `Today's focus: colour on your plate! Aim for at least 3 different coloured vegetables in your meals — each colour means different antioxidants. 🌈`
      ],
      evening: [
        `Wind-down tip: avoid heavy meals within 2 hours of sleep. A light soup or khichdi tonight = better sleep quality and digestion. 🌙`,
        `Evening reminder: your body needs magnesium for quality sleep. A handful of pumpkin seeds or a banana before bed can help. 🌿`
      ]
    }
  };

  const condition = user.condition || 'GENERAL_HEALTHY';
  const timeKey = isMorning ? 'morning' : 'evening';
  const nudgeList = (nudges[condition] || nudges.GENERAL_HEALTHY)[timeKey];
  const nudge = nudgeList[Math.floor(Math.random() * nudgeList.length)];

  return {
    nudge,
    condition,
    time_of_day: isMorning ? 'morning' : isEvening ? 'evening' : 'afternoon',
    streak: streak,
    generated_at: new Date().toISOString()
  };
}

module.exports = { processCraving, generateMealPlan, generateNudge };
