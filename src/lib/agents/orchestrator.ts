// import { Crew, Agent, Task, Process, LLM } from 'crewai';
// Note: In a real Next.js environment, we would use a more light-weight agentic framework 
// or call a Python microservice. For this implementation, we define the structure locally to avoid build errors.

class Agent {
    constructor(config: any) {
        console.log("Mock Agent initialized with:", config);
    }
}
class Task { }
class Process { }
class Crew { }
class LLM { }

export interface AgentResponse {
    plan: string;
    actions: {
        type: 'reservation' | 'map' | 'payment' | 'info' | 'map_layer';
        target: string;
        details: any;
    }[];
}

import { sampleSpots } from "../../data/spots";

export class AgentOrchestrator {
    private planner: Agent;
    private actionAgent: Agent;

    constructor() {
        this.planner = new Agent({
            role: 'Hyper-Local Planner',
            goal: 'Design a seamless travel itinerary based on local secret spots and user preference.',
            backstory: 'Expert in Seoul hidden gems and optimal routing.',
            verbose: true
        });

        this.actionAgent = new Agent({
            role: 'Action Executor',
            goal: 'Perform actual reservations and bookings on behalf of the user.',
            backstory: 'Bypasses digital barriers like local phone number requirements.',
            verbose: true
        });
    }

    async processRequest(query: string): Promise<AgentResponse> {
        console.log(`Processing KGEM 2026 Agent Request: ${query}`);
        const lowerQuery = query.toLowerCase();

        // 1. Detect Category
        let categoryKey = '';
        if (lowerQuery.includes('gangnam') || lowerQuery.includes('강남')) categoryKey = 'gangnam';
        else if (lowerQuery.includes('bbq') || lowerQuery.includes('삼겹살') || lowerQuery.includes('solo') || lowerQuery.includes('혼밥')) categoryKey = 'bbq';
        else if (lowerQuery.includes('tea') || lowerQuery.includes('티 투어') || lowerQuery.includes('찻집')) categoryKey = 'tea';

        // 2. Detect Region (Basic)
        const regions = ['seoul', 'busan', 'jeju', 'incheon', 'gyeonggi', 'gangwon', 'daegu', 'daejeon', 'gwangju', 'ulsan', 'sejong'];
        const detectedRegion = regions.find(r => lowerQuery.includes(r));

        // 3. Filter Spots
        const filteredSpots = sampleSpots.filter(spot => {
            const matchesCategory = categoryKey ? (spot.id as string).includes(categoryKey) : true;
            const matchesRegion = detectedRegion ? (spot.id as string).includes(detectedRegion) : true;
            const matchesText = spot.title.ko.includes(query) || spot.title.en.toLowerCase().includes(lowerQuery);
            return (matchesCategory && matchesRegion) || matchesText;
        }).slice(0, 50); // Limit to top 50 for UI performance

        if (filteredSpots.length > 0) {
            return {
                plan: `I've found ${filteredSpots.length} premium spots matching your request for "${query}". These are verified 0.1% local favorites.`,
                actions: [
                    {
                        type: 'info',
                        target: 'Filtered Results',
                        details: {
                            spots: filteredSpots.map(s => s.id),
                            count: filteredSpots.length
                        }
                    }
                ]
            };
        }

        return {
            plan: "Based on your interest, I've curated a unique Korean experience with local verified spots.",
            actions: [
                {
                    type: 'info',
                    target: 'Custom Route',
                    details: { language: 'en', blufEnabled: true }
                }
            ]
        };
    }
}

export const kgemAgent = new AgentOrchestrator();
