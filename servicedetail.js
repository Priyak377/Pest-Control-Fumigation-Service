
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const serviceType = (params.get("service") || "").toLowerCase().trim();

    const services = {
        residential: {
            title: "Residential Pest Control",
            subtitle: "Complete pest protection for a safer and healthier home.",
            description: "Our residential pest control solutions protect your home from unwanted pests. We inspect affected areas, identify pest activity and apply suitable treatments to keep your living spaces clean, safe and comfortable.",
            benefitsTitle: "Complete Protection for Your Home",
            benefitsIntro: "Our residential pest control services help protect your family and property with effective pest management solutions.",
            benefits: [
                "Detailed home inspection and pest identification",
                "Targeted treatments for common household pests",
                "Safe and suitable treatment recommendations",
                "Prevention guidance to reduce future infestations",
                "Reliable follow-up support"
            ]
        },

        commercial: {
            title: "Commercial Pest Control",
            subtitle: "Professional pest management for your business.",
            description: "Maintain a clean and pest-free workplace with our commercial pest control solutions. We provide tailored pest management for offices, restaurants, warehouses, retail spaces and other commercial properties.",
            benefitsTitle: "Protect Your Business Environment",
            benefitsIntro: "Our commercial solutions help maintain hygienic spaces and minimize pest-related disruptions to your operations.",
            benefits: [
                "Customized pest management plans",
                "Inspection of high-risk commercial areas",
                "Targeted treatment for business premises",
                "Preventive monitoring and recommendations",
                "Scheduled pest control support"
            ]
        },

        termite: {
            title: "Termite Control",
            subtitle: "Protect your property from damaging termite infestations.",
            description: "Termites can cause serious damage to wooden structures and property interiors. Our termite control service focuses on identifying termite activity, treating affected areas and helping prevent future infestations.",
            benefitsTitle: "Long-Term Termite Protection",
            benefitsIntro: "Our termite management solutions help safeguard your property against costly structural damage.",
            benefits: [
                "Thorough termite inspection",
                "Identification of active termite zones",
                "Targeted treatment for affected areas",
                "Protection for vulnerable wooden structures",
                "Prevention and maintenance recommendations"
            ]
        },

        cockroach: {
            title: "Cockroach Control",
            subtitle: "Keep your kitchen and living spaces clean and pest-free.",
            description: "Cockroaches can spread contamination and create unhealthy conditions. Our cockroach control service targets common hiding and breeding areas to reduce infestation and help maintain a hygienic environment.",
            benefitsTitle: "Effective Cockroach Management",
            benefitsIntro: "We focus on treating common cockroach hotspots and reducing the chances of recurring infestations.",
            benefits: [
                "Inspection of kitchens and damp areas",
                "Identification of cockroach hiding spots",
                "Targeted treatment for affected areas",
                "Attention to cracks, gaps and entry points",
                "Practical prevention recommendations"
            ]
        },

        mosquito: {
            title: "Mosquito Control",
            subtitle: "Reduce mosquito activity around your property.",
            description: "Our mosquito control solutions help reduce mosquito activity around residential and commercial properties. We identify potential breeding areas and recommend suitable treatments and preventive measures.",
            benefitsTitle: "Better Outdoor and Indoor Comfort",
            benefitsIntro: "Our mosquito management approach focuses on reducing breeding opportunities and controlling mosquito activity.",
            benefits: [
                "Inspection of potential breeding areas",
                "Identification of stagnant water sources",
                "Targeted mosquito control treatments",
                "Recommendations for breeding prevention",
                "Follow-up guidance when required"
            ]
        },

        rodent: {
            title: "Rodent Control",
            subtitle: "Protect your property from rats and mice.",
            description: "Rodents can damage property, contaminate food and create health concerns. Our rodent control service identifies signs of activity, locates possible entry points and recommends suitable control and prevention measures.",
            benefitsTitle: "Reliable Rodent Management",
            benefitsIntro: "We help protect your property by addressing rodent activity and reducing opportunities for reinfestation.",
            benefits: [
                "Inspection for rodent activity and droppings",
                "Identification of possible entry points",
                "Targeted rodent control solutions",
                "Recommendations for sealing access points",
                "Prevention and sanitation guidance"
            ]
        }
    };

    const service = services[serviceType];

    if (!service) {
        console.warn("Service not found. URL parameter:", serviceType);
        return;
    }

    // Update page title
    document.title = `${service.title} | Verminex`;

    // Update service content
    const updateText = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    };

    updateText("serviceTitle", service.title);
    updateText("serviceSubtitle", service.subtitle);
    updateText("serviceDescription", service.description);
    updateText("benefitsTitle", service.benefitsTitle);
    updateText("benefitsIntro", service.benefitsIntro);

    // Update benefits list
    const benefitsList = document.getElementById("benefitsList");

    if (benefitsList) {
        benefitsList.replaceChildren();

        service.benefits.forEach((benefit) => {
            const li = document.createElement("li");
            li.textContent = benefit;
            benefitsList.appendChild(li);
        });
    }
});
