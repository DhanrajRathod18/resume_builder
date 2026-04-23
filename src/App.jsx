import { useState } from 'react';
import { Download, Eye } from 'lucide-react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import './App.css';

const INITIAL_DATA = {
  photo: '',
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  website: '',
  summary: '',
  experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
  education: [{ institution: '', degree: '', field: '', startDate: '', endDate: '' }],
  projects: [{ name: '', description: '', techStack: '', link: '' }],
  skills: '',
};

export default function App() {
  const [resumeData, setResumeData] = useState(INITIAL_DATA);
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="app">
      {/* Top bar */}
      <nav className="topbar no-print">
        <div className="topbar__brand">
          <span className="topbar__logo">📄</span>
          <span className="topbar__title">
            <span className="topbar__title-accent">Resume</span>Builder
          </span>
        </div>
        <div className="topbar__actions">
          <button
            className="uv-btn uv-btn--outline mobile-toggle"
            onClick={() => setShowPreviewMobile(!showPreviewMobile)}
          >
            <Eye size={16} />
            {showPreviewMobile ? 'Edit' : 'Preview'}
          </button>
          <button className="uv-btn" onClick={handleDownloadPDF} id="download-pdf-btn">
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </nav>

      {/* Main layout */}
      <main className="main-layout">
        <aside className={`main-layout__form ${showPreviewMobile ? 'hidden-mobile' : ''}`}>
          <ResumeForm data={resumeData} onChange={setResumeData} />
        </aside>
        <section className={`main-layout__preview ${!showPreviewMobile ? 'hidden-mobile' : ''}`}>
          <ResumePreview data={resumeData} />
        </section>
      </main>
    </div>
  );
}
