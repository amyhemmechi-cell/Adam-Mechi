
import React, { useState } from 'react';
import type { AnalysisResponse, PageVision, ProjectsPageVision } from '../types';

type Tab = 'Home' | 'Projects' | 'About' | 'Contact';

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-light tracking-widest uppercase border-b border-gray-700 pb-3 mb-4 text-white">{title}</h2>
        {children}
    </div>
);

const DetailItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="mb-4">
        <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wider">{label}</h3>
        <div className="text-gray-300 mt-1 prose prose-invert prose-p:text-gray-300 max-w-none">{children}</div>
    </div>
);

const ProgressBar: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div>
        <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wider mb-2">{label}</h3>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-white h-2.5 rounded-full" style={{ width: `${value}%` }}></div>
        </div>
        <p className="text-right text-white font-mono text-lg mt-1">{value}%</p>
    </div>
);

const Rating: React.FC<{ value: number; label: string }> = ({ value, label }) => (
     <div>
        <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wider mb-2">{label}</h3>
        <div className="flex items-center gap-2">
            {[...Array(10)].map((_, i) => (
                <div key={i} className={`w-full h-2 rounded-sm ${i < value ? 'bg-white' : 'bg-gray-700'}`}></div>
            ))}
        </div>
         <p className="text-right text-white font-mono text-lg mt-1">{value}/10</p>
    </div>
);


export const AnalysisDisplay: React.FC<{ analysis: AnalysisResponse }> = ({ analysis }) => {
    const [activeTab, setActiveTab] = useState<Tab>('Home');
    const { audit, readiness, vision } = analysis;
    
    const tabs: Tab[] = ['Home', 'Projects', 'About', 'Contact'];

    const renderTabContent = () => {
        let pageData: PageVision | ProjectsPageVision;
        switch (activeTab) {
            case 'Projects':
                pageData = vision.projects;
                return (
                    <div>
                        <PageContent page={pageData} />
                        <div className="mt-6 pt-6 border-t border-gray-700">
                             <h3 className="text-xl font-light tracking-wider uppercase text-white mb-4">Featured Projects</h3>
                             {(pageData as ProjectsPageVision).projectsList.map((p, i) => (
                                <div key={i} className="mb-4 border-l-2 border-gray-600 pl-4">
                                    <h4 className="font-semibold text-white">{p.title}</h4>
                                    <p className="text-gray-400 italic">"{p.logline}"</p>
                                    <p className="text-gray-300 mt-1">{p.description}</p>
                                </div>
                             ))}
                        </div>
                         <div className="mt-6 pt-6 border-t border-gray-700">
                             <h3 className="text-xl font-light tracking-wider uppercase text-white mb-4">Album Series</h3>
                              <p className="text-gray-300 mb-4">{(pageData as ProjectsPageVision).albumSeries.intro}</p>
                             {(pageData as ProjectsPageVision).albumSeries.albums.map((a, i) => (
                                <div key={i} className="mb-4 border-l-2 border-gray-600 pl-4">
                                    <h4 className="font-semibold text-white">{a.title}</h4>
                                    <p className="text-gray-300 mt-1">{a.concept}</p>
                                </div>
                             ))}
                        </div>
                    </div>
                );
            case 'About':
                pageData = vision.about;
                break;
            case 'Contact':
                pageData = vision.contact;
                break;
            case 'Home':
            default:
                pageData = vision.home;
                break;
        }
        return <PageContent page={pageData} />;
    };

    const PageContent: React.FC<{ page: PageVision }> = ({ page }) => (
        <>
            <DetailItem label="Page Title"><p>{page.title}</p></DetailItem>
            <DetailItem label="Meta Description"><p>{page.metaDescription}</p></DetailItem>
            <DetailItem label="Layout & UX Flow"><p>{page.layout}</p></DetailItem>
            <DetailItem label="Page Content"><p>{page.content}</p></DetailItem>
            {page.cta && <DetailItem label="Call to Action"><p className="font-bold">{page.cta}</p></DetailItem>}
        </>
    );

    return (
        <div className="mt-12 animate-fade-in">
            <SectionCard title="Website Audit">
                <DetailItem label="Brand Identity & Mission"><p>{audit.brandIdentity}</p></DetailItem>
                <DetailItem label="Content Inventory"><p>{audit.contentInventory}</p></DetailItem>
                <DetailItem label="Strengths & Weaknesses"><p>{audit.strengthsWeaknesses}</p></DetailItem>
            </SectionCard>

            <SectionCard title="Readiness Assessment">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <ProgressBar value={readiness.festivalSuccessPotential.rating} label="Festival Success Potential"/>
                        <p className="text-gray-300 mt-2">{readiness.festivalSuccessPotential.justification}</p>
                    </div>
                     <div>
                        <Rating value={readiness.platformInterest.rating} label="Platform Interest (Netflix, etc.)"/>
                        <p className="text-gray-300 mt-2">{readiness.platformInterest.justification}</p>
                    </div>
                </div>
            </SectionCard>
            
            <SectionCard title="New Website Vision">
                <div className="mb-6">
                    <div className="border-b border-gray-700">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`${
                                        activeTab === tab
                                            ? 'border-white text-white'
                                            : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors uppercase tracking-wider`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
                <div className="animate-fade-in-fast">
                    {renderTabContent()}
                </div>
            </SectionCard>
        </div>
    );
};

// Add fade-in animation styles to index.html or a global CSS file if you had one.
// For Tailwind JIT, you can define them in tailwind.config.js, but for CDN we add a style tag.
// We'll inject it here for simplicity.
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
    .animate-fade-in-fast {
        animation: fadeIn 0.3s ease-out forwards;
    }
`;
document.head.appendChild(style);
