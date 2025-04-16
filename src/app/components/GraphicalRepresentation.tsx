'use client';

import { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Main modal component for graphical representation
export function GraphicalModal({ 
  isOpen, 
  onClose, 
  topic, 
  content 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  topic: string;
  content: string;
}) {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [exportingPdf, setExportingPdf] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Parse content for visualization when modal opens
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      
      // Parse the learning path content to extract visualization data
      const parsedData = parseLearningPathContent(content);
      setChartData(parsedData);
      
      setLoading(false);
    }
  }, [isOpen, content]);
  
  // Function to export the visualization content as PDF
  const exportToPDF = async () => {
    if (!contentRef.current) return;
    
    try {
      setExportingPdf(true);
      
      const element = contentRef.current;
      const filename = `${topic.replace(/\s+/g, '_')}_visualization.pdf`;
      
      // Create a new jsPDF instance
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Get page dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Function to add watermark
      const addWatermark = (pdf: any) => {
        // Store the current state
        const currentFontSize = pdf.getFontSize();
        const currentTextColor = pdf.getTextColor();
        const currentFont = pdf.getFont();
        
        // Set properties for watermark
        pdf.setTextColor(200, 200, 200); // Light gray
        pdf.setFontSize(30);
        pdf.setFont('helvetica', 'italic');
        
        const text = 'Learning Path Advisor';
        
        // Add diagonal watermarks using the angle parameter
        // Position watermark in the center of the page
        pdf.text(text, pdfWidth/2, pdfHeight/2, { 
          align: 'center',
          angle: 45
        });
        
        // Restore previous settings
        pdf.setFontSize(currentFontSize);
        pdf.setTextColor(currentTextColor);
        pdf.setFont(currentFont.fontName);
      };
      
      // Convert each section of the content to canvas and add to PDF
      const sections = element.children;
      let yOffset = 20; // Starting Y position
      
      // Add title
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Learning Path: ${topic}`, pdfWidth / 2, yOffset, { align: 'center' });
      yOffset += 15;
      
      // Process each section
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        if (!section) continue;
        
        // Check if we need a new page before this section
        if (i > 0 && yOffset > pdfHeight - 40) {
          addWatermark(pdf);
          pdf.addPage();
          yOffset = 20;
        }
        
        // Capture section as canvas
        const canvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true
        });
        
        // Calculate the width to fit on page while maintaining aspect ratio
        const sectionWidth = pdfWidth - 20; // 10mm margin on each side
        const sectionHeight = (canvas.height * sectionWidth) / canvas.width;
        
        // Add section to PDF
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 10, yOffset, sectionWidth, sectionHeight);
        
        // Update yOffset for the next section
        yOffset += sectionHeight + 10;
        
        // Add new page if there's another section coming and not enough space
        if (i < sections.length - 1 && yOffset > pdfHeight - 40) {
          addWatermark(pdf);
          pdf.addPage();
          yOffset = 20;
        }
      }
      
      // Add watermark to the last page
      addWatermark(pdf);
      
      // Save the PDF
      pdf.save(filename);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setExportingPdf(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              Graphical Visualization: {topic}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={exportToPDF}
                disabled={loading || exportingPdf}
                className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 flex items-center"
              >
                {exportingPdf ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                    Export PDF
                  </>
                )}
              </button>
               
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-130px)]">
          {loading || exportingPdf ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">
                {exportingPdf ? 'Processing visualization...' : 'Generating visualization...'}
              </p>
            </div>
          ) : (
            <div ref={contentRef}>
              <LearningPathVisualization data={chartData} />
              <TimelineChart data={chartData} />
              <ResourcesChart data={chartData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Button component to trigger the modal
export function GraphicalRepresentationButton({ topic, content }: { topic: string; content: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      <button
        onClick={openModal}
        className="inline-block px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition-colors"
      >
        Get Graphical Representation
      </button>
      
      <GraphicalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        topic={topic}
        content={content}
      />
    </>
  );
}

// Helper function to parse learning path content for visualization
function parseLearningPathContent(content: string) {
  // Split content by lines
  const lines = content.split('\n');
  
  const topics: {title: string; subtopics: {title: string; time?: string; resources?: string[]}[]}[] = [];
  const timeEstimates: {topic: string; time: string}[] = [];
  const resources: {topic: string; resource: string}[] = [];
  
  let currentTopic: string | null = null;
  let currentSubtopic: string | null = null;
  
  lines.forEach(line => {
    // Main topic (h1)
    if (line.startsWith('# ')) {
      currentTopic = line.slice(2).trim();
      topics.push({ title: currentTopic, subtopics: [] });
      currentSubtopic = null;
    } 
    // Subtopic (h2)
    else if (line.startsWith('## ') && currentTopic) {
      currentSubtopic = line.slice(3).trim();
      const currentTopicObj = topics.find(t => t.title === currentTopic);
      if (currentTopicObj) {
        currentTopicObj.subtopics.push({ title: currentSubtopic, resources: [] });
      }
    }
    // Look for estimated time
    else if (line.includes('Estimated time:') && (currentTopic || currentSubtopic)) {
      const time = line.split('Estimated time:')[1].trim();
      timeEstimates.push({ 
        topic: currentSubtopic || currentTopic || 'Unknown', 
        time 
      });
      
      // Also add to subtopics
      if (currentTopic && currentSubtopic) {
        const topicObj = topics.find(t => t.title === currentTopic);
        if (topicObj) {
          const subtopicObj = topicObj.subtopics.find(s => s.title === currentSubtopic);
          if (subtopicObj) {
            subtopicObj.time = time;
          }
        }
      }
    }
    // Look for resources
    else if ((line.includes('Resources:') || line.includes('Book:') || line.includes('Course:') || line.includes('Website:')) && (currentTopic || currentSubtopic)) {
      const resource = line.trim();
      resources.push({
        topic: currentSubtopic || currentTopic || 'Unknown',
        resource: resource.replace(/^[*-]\s/, '') // Remove bullet points
      });
      
      // Also add to subtopics
      if (currentTopic && currentSubtopic) {
        const topicObj = topics.find(t => t.title === currentTopic);
        if (topicObj) {
          const subtopicObj = topicObj.subtopics.find(s => s.title === currentSubtopic);
          if (subtopicObj) {
            if (!subtopicObj.resources) {
              subtopicObj.resources = [];
            }
            subtopicObj.resources.push(resource.replace(/^[*-]\s/, ''));
          }
        }
      }
    }
  });

  return {
    topics,
    timeEstimates,
    resources
  };
}

// Learning path structure visualization (tree diagram)
function LearningPathVisualization({ data }: { data: any }) {
  if (!data || !data.topics || data.topics.length === 0) {
    return <div className="text-gray-500 text-center py-8">No visualization data available</div>;
  }
  
  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold mb-4">Learning Path Structure</h3>
      <div className="border p-6 rounded-lg bg-gray-50">
        <div className="overflow-x-auto">
          {data.topics.map((topic: any, index: number) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="px-4 py-2 bg-purple-100 rounded-lg border border-purple-200 font-medium text-purple-800">
                {topic.title}
              </div>
              
              {topic.subtopics.length > 0 && (
                <div className="ml-8 mt-3 pl-4 border-l-2 border-gray-300">
                  {topic.subtopics.map((subtopic: any, sIndex: number) => (
                    <div key={sIndex} className="mb-3 last:mb-0 relative">
                      {/* Connector line */}
                      <div className="absolute top-1/2 -left-4 w-4 h-px bg-gray-300"></div>
                      
                      <div className="px-3 py-2 bg-blue-50 rounded border border-blue-200 flex items-center justify-between">
                        <span className="text-blue-800">{subtopic.title}</span>
                        {subtopic.time && (
                          <span className="text-xs bg-blue-100 px-2 py-1 rounded text-blue-600">
                            {subtopic.time}
                          </span>
                        )}
                      </div>
                      
                      {subtopic.resources && subtopic.resources.length > 0 && (
                        <div className="ml-6 mt-2 pl-3 border-l border-gray-200">
                          {subtopic.resources.map((resource: string, rIndex: number) => (
                            <div key={rIndex} className="text-xs text-gray-600 mb-1 last:mb-0">
                              {resource}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Timeline chart component
function TimelineChart({ data }: { data: any }) {
  if (!data || !data.timeEstimates || data.timeEstimates.length === 0) {
    return null;
  }
  
  // Convert time strings to weeks for visualization
  const timelineData = data.timeEstimates.map((item: any) => {
    const timeStr = item.time.toLowerCase();
    let weeks = 0;
    
    if (timeStr.includes('week')) {
      const match = timeStr.match(/(\d+)(?:-(\d+))?/);
      if (match) {
        if (match[2]) {
          // Range like "2-3 weeks"
          weeks = (parseInt(match[1]) + parseInt(match[2])) / 2;
        } else {
          // Simple like "2 weeks"
          weeks = parseInt(match[1]);
        }
      }
    } else if (timeStr.includes('month')) {
      const match = timeStr.match(/(\d+)(?:-(\d+))?/);
      if (match) {
        if (match[2]) {
          // Range like "1-2 months"
          weeks = ((parseInt(match[1]) + parseInt(match[2])) / 2) * 4;
        } else {
          // Simple like "1 month"
          weeks = parseInt(match[1]) * 4;
        }
      }
    } else if (timeStr.includes('day')) {
      const match = timeStr.match(/(\d+)(?:-(\d+))?/);
      if (match) {
        if (match[2]) {
          // Range like "5-10 days"
          weeks = ((parseInt(match[1]) + parseInt(match[2])) / 2) / 7;
        } else {
          // Simple like "5 days"
          weeks = parseInt(match[1]) / 7;
        }
      }
    }
    
    return {
      topic: item.topic,
      weeks: weeks || 1 // Default to 1 week if parsing fails
    };
  });
  
  // Calculate cumulative weeks for timeline
  let cumulativeWeeks = 0;
  const timelineItems = timelineData.map((item: any) => {
    const start = cumulativeWeeks;
    cumulativeWeeks += item.weeks;
    return {
      ...item,
      start,
      end: cumulativeWeeks
    };
  });
  
  // Generate month labels for the timeline
  const totalWeeks = cumulativeWeeks;
  const monthLabels = [];
  for (let i = 0; i <= Math.ceil(totalWeeks / 4); i++) {
    monthLabels.push(`Month ${i + 1}`);
  }
  
  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold mb-4">Timeline Estimate</h3>
      <div className="border p-6 rounded-lg bg-gray-50">
        {/* Month scale */}
        <div className="flex mb-2">
          {monthLabels.map((label, i) => (
            <div key={i} className="text-xs text-gray-500" style={{ width: `${(4 / totalWeeks) * 100}%` }}>
              {label}
            </div>
          ))}
        </div>
        
        {/* Timeline scale */}
        <div className="h-2 bg-gray-200 rounded-full mb-6 relative">
          {monthLabels.map((_, i) => (
            <div 
              key={i} 
              className="absolute w-px h-3 bg-gray-400" 
              style={{ left: `${(i * 4 / totalWeeks) * 100}%`, top: '-4px' }}
            ></div>
          ))}
        </div>
        
        {/* Timeline items */}
        <div className="space-y-4">
          {timelineItems.map((item: any, index: number) => (
            <div key={index} className="relative">
              <div className="text-sm font-medium mb-1">{item.topic}</div>
              <div className="flex items-center">
                <div 
                  className="absolute text-xs text-gray-600"
                  style={{ left: `${(item.start / totalWeeks) * 100}%`, transform: 'translateX(-50%)' }}
                >
                  Week {Math.round(item.start)}
                </div>
                <div 
                  className="h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium"
                  style={{ 
                    width: `${((item.end - item.start) / totalWeeks) * 100}%`,
                    marginLeft: `${(item.start / totalWeeks) * 100}%`,
                    backgroundColor: getTopicColor(index)
                  }}
                >
                  {item.weeks.toFixed(1)} weeks
                </div>
                <div 
                  className="absolute text-xs text-gray-600"
                  style={{ left: `${(item.end / totalWeeks) * 100}%`, transform: 'translateX(-50%)' }}
                >
                  Week {Math.round(item.end)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Resources chart component
function ResourcesChart({ data }: { data: any }) {
  if (!data || !data.resources || data.resources.length === 0) {
    return null;
  }
  
  // Count resource types
  const resourceCounts: Record<string, number> = {};
  const resourceTypes = ['Book', 'Course', 'Website', 'Other'];
  
  data.resources.forEach((res: any) => {
    const resource = res.resource.toLowerCase();
    if (resource.includes('book')) {
      resourceCounts['Book'] = (resourceCounts['Book'] || 0) + 1;
    } else if (resource.includes('course')) {
      resourceCounts['Course'] = (resourceCounts['Course'] || 0) + 1;
    } else if (resource.includes('website')) {
      resourceCounts['Website'] = (resourceCounts['Website'] || 0) + 1;
    } else {
      resourceCounts['Other'] = (resourceCounts['Other'] || 0) + 1;
    }
  });
  
  const chartData = resourceTypes.map(type => ({
    type,
    count: resourceCounts[type] || 0
  })).filter(item => item.count > 0);
  
  // Calculate the max value for scaling
  const maxCount = Math.max(...chartData.map(d => d.count));
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Resources Distribution</h3>
      <div className="border p-6 rounded-lg bg-gray-50">
        <div className="space-y-4">
          {chartData.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{item.type}</span>
                <span className="text-sm text-gray-600">{item.count}</span>
              </div>
              <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${(item.count / maxCount) * 100}%`,
                    backgroundColor: getResourceColor(i)
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to get colors for timeline items
function getTopicColor(index: number) {
  const colors = [
    '#4F46E5', // Indigo
    '#7C3AED', // Violet
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#8B5CF6', // Purple
  ];
  
  return colors[index % colors.length];
}

// Helper function to get colors for resource bars
function getResourceColor(index: number) {
  const colors = [
    '#3B82F6', // Blue
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
  ];
  
  return colors[index % colors.length];
}