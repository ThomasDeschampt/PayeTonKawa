'use client';

import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: "Quelle est la différence entre arabica et robusta ?",
    reponse: "L'arabica est plus doux et aromatique avec des notes fruitées et florales, tandis que le robusta est plus corsé et amer avec plus de caféine. L'arabica pousse en altitude (600-2000m) et le robusta en plaine."
  },
  {
    question: "Comment moudre son café correctement ?",
    reponse: "La mouture dépend de votre méthode de préparation : fine pour l'espresso, moyenne pour le filtre, grossière pour la cafetière à piston. Moulez juste avant l'extraction pour préserver les arômes."
  },
  {
    question: "Quelle température d'eau utiliser ?",
    reponse: "L'eau idéale est entre 90-96°C. Trop chaude, elle brûle le café et le rend amer. Trop froide, elle n'extrait pas suffisamment les arômes. Laissez refroidir l'eau bouillante 30 secondes."
  },
  {
    question: "Combien de temps conserver le café moulu ?",
    reponse: "Le café moulu se conserve 1-2 semaines maximum dans un contenant hermétique, à l'abri de la lumière. Les grains entiers se conservent 2-4 semaines. Privilégiez toujours les petites quantités."
  },
  {
    question: "Quel ratio café/eau respecter ?",
    reponse: "Le ratio standard est de 60g de café pour 1L d'eau (1:16). Ajustez selon vos goûts : plus de café pour un goût plus fort, moins pour un café plus léger. Pesez toujours vos ingrédients."
  }
];

export default function FAQPage() {
  return (
    <Box sx={{ backgroundColor: '#FEFEFE', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Playfair Display, serif',
            textAlign: 'center',
            mb: 4,
            color: '#2E2E2E'
          }}
        >
          Questions fréquentes
        </Typography>

        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 2,
              borderRadius: 2,
              '&:before': { display: 'none' },
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#D4AF37' }} />}
              sx={{
                backgroundColor: '#F8F8F8',
                borderRadius: 2,
                '&.Mui-expanded': {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0
                }
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  color: '#2E2E2E',
                  fontSize: '1.1rem'
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: 'white', p: 3 }}>
              <Typography sx={{ color: '#666', lineHeight: 1.6 }}>
                {faq.reponse}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
