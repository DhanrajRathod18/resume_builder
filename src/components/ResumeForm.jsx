import { useState, useRef } from 'react';
import {
  User, FileText, Briefcase, GraduationCap, Wrench,
  Plus, Trash2, ChevronDown, ChevronUp, Camera, X, FolderGit2, ExternalLink
} from 'lucide-react';
import './ResumeForm.css';

const EMPTY_EXPERIENCE = { company: '', position: '', startDate: '', endDate: '', description: '' };
const EMPTY_EDUCATION = { institution: '', degree: '', field: '', startDate: '', endDate: '' };
const EMPTY_PROJECT = { name: '', description: '', techStack: '', link: '' };

export default function ResumeForm({ data, onChange }) {
  const [openSections, setOpenSections] = useState({
    personal: true, summary: true, experience: true, education: true, projects: true, skills: true
  });

  const toggle = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const updateField = (field, value) => onChange({ ...data, [field]: value });

  const updateExperience = (index, field, value) => {
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, experience: updated });
  };

  const addExperience = () => onChange({ ...data, experience: [...data.experience, { ...EMPTY_EXPERIENCE }] });
  const removeExperience = (i) => onChange({ ...data, experience: data.experience.filter((_, idx) => idx !== i) });

  const updateEducation = (index, field, value) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, education: updated });
  };

  const addEducation = () => onChange({ ...data, education: [...data.education, { ...EMPTY_EDUCATION }] });
  const removeEducation = (i) => onChange({ ...data, education: data.education.filter((_, idx) => idx !== i) });

  const updateSkills = (value) => onChange({ ...data, skills: value });

  const updateProject = (index, field, value) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, projects: updated });
  };

  const addProject = () => onChange({ ...data, projects: [...data.projects, { ...EMPTY_PROJECT }] });
  const removeProject = (i) => onChange({ ...data, projects: data.projects.filter((_, idx) => idx !== i) });

  const fileInputRef = useRef(null);

  const handlePhotoUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => updateField('photo', e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handlePhotoUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const SectionHeader = ({ id, icon: Icon, title }) => (
    <div className="uv-card__header" onClick={() => toggle(id)} style={{ cursor: 'pointer' }}>
      <span className="uv-card__title">
        <Icon className="uv-card__title-icon" />
        {title}
      </span>
      {openSections[id] ? <ChevronUp size={18} color="#9595a8" /> : <ChevronDown size={18} color="#9595a8" />}
    </div>
  );

  return (
    <div className="resume-form no-print">
      <div className="form-header">
        <h1 className="form-title">
          <span className="form-title__accent">Resume</span> Builder
        </h1>
        <p className="form-subtitle">Fill in your details to generate a professional resume</p>
      </div>

      {/* Personal Info */}
      <div className="uv-card form-section">
        <SectionHeader id="personal" icon={User} title="Personal Information" />
        {openSections.personal && (
          <>
          {/* Photo Upload */}
          <div className="photo-upload-area">
            <div
              className={`photo-dropzone ${data.photo ? 'has-photo' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {data.photo ? (
                <>
                  <img src={data.photo} alt="Profile" className="photo-preview-img" />
                  <button
                    type="button"
                    className="photo-remove-btn"
                    onClick={(e) => { e.stopPropagation(); updateField('photo', ''); }}
                  >
                    <X size={14} />
                  </button>
                </>
              ) : (
                <>
                  <Camera size={28} className="photo-dropzone__icon" />
                  <span className="photo-dropzone__text">Upload Photo</span>
                  <span className="photo-dropzone__hint">Click or drag & drop</span>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="photo-file-input"
              onChange={(e) => handlePhotoUpload(e.target.files[0])}
            />
          </div>
          <div className="form-grid">
            <div className="uv-input-group">
              <label className="uv-label" htmlFor="fullName">Full Name <span className="required-star">*</span></label>
              <input id="fullName" className="uv-input" type="text" placeholder="Dhanraj Rathod" required value={data.fullName} onChange={e => updateField('fullName', e.target.value)} />
            </div>
            <div className="uv-input-group">
              <label className="uv-label" htmlFor="jobTitle">Job Title <span className="required-star">*</span></label>
              <input id="jobTitle" className="uv-input" type="text" placeholder="Front-end Developer" required value={data.jobTitle} onChange={e => updateField('jobTitle', e.target.value)} />
            </div>
            <div className="uv-input-group">
              <label className="uv-label" htmlFor="email">Email <span className="required-star">*</span></label>
              <input id="email" className="uv-input" type="email" placeholder="dhanrajrathod@example.com" required value={data.email} onChange={e => updateField('email', e.target.value)} />
            </div>
            <div className="uv-input-group">
              <label className="uv-label" htmlFor="phone">Phone <span className="required-star">*</span></label>
              <input id="phone" className="uv-input" type="tel" placeholder="+1 234 567 8900" required value={data.phone} onChange={e => updateField('phone', e.target.value)} />
            </div>
            <div className="uv-input-group span-full">
              <label className="uv-label" htmlFor="location">Location <span className="required-star">*</span></label>
              <input id="location" className="uv-input" type="text" placeholder="San Francisco, CA" required value={data.location} onChange={e => updateField('location', e.target.value)} />
            </div>
            <div className="uv-input-group">
              <label className="uv-label" htmlFor="linkedin">LinkedIn</label>
              <input id="linkedin" className="uv-input" type="url" placeholder="linkedin.com/in/dhanrajrathod" value={data.linkedin} onChange={e => updateField('linkedin', e.target.value)} />
            </div>
            <div className="uv-input-group">
              <label className="uv-label" htmlFor="website">Website</label>
              <input id="website" className="uv-input" type="url" placeholder="dhanrajrathod.dev" value={data.website} onChange={e => updateField('website', e.target.value)} />
            </div>
          </div>
          </>
        )}
      </div>

      {/* Summary */}
      <div className="uv-card form-section">
        <SectionHeader id="summary" icon={FileText} title="Professional Summary" />
        {openSections.summary && (
          <div className="uv-input-group">
            <label className="uv-label" htmlFor="summary">Summary <span className="required-star">*</span></label>
            <textarea id="summary" className="uv-input uv-textarea" placeholder="A passionate developer with 5+ years of experience..." required value={data.summary} onChange={e => updateField('summary', e.target.value)} />
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="uv-card form-section">
        <SectionHeader id="experience" icon={Briefcase} title="Work Experience" />
        {openSections.experience && (
          <div className="dynamic-section">
            {data.experience.map((exp, i) => (
              <div key={i} className="dynamic-item">
                <div className="dynamic-item__header">
                  <span className="dynamic-item__number">{i + 1}</span>
                  {data.experience.length > 1 && (
                    <button type="button" className="uv-btn uv-btn--danger uv-btn--sm" onClick={() => removeExperience(i)}>
                      <Trash2 size={14} /> Remove
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="uv-input-group">
                    <label className="uv-label">Company <span className="required-star">*</span></label>
                    <input className="uv-input" type="text" placeholder="Google" required value={exp.company} onChange={e => updateExperience(i, 'company', e.target.value)} />
                  </div>
                  <div className="uv-input-group">
                    <label className="uv-label">Position <span className="required-star">*</span></label>
                    <input className="uv-input" type="text" placeholder="Senior Developer" required value={exp.position} onChange={e => updateExperience(i, 'position', e.target.value)} />
                  </div>
                  <div className="uv-input-group">
                    <label className="uv-label">Start Date <span className="required-star">*</span></label>
                    <input className="uv-input" type="month" required value={exp.startDate} onChange={e => updateExperience(i, 'startDate', e.target.value)} />
                  </div>
                  <div className="uv-input-group">
                    <label className="uv-label">End Date</label>
                    <input className="uv-input" type="month" placeholder="Present" value={exp.endDate} onChange={e => updateExperience(i, 'endDate', e.target.value)} />
                  </div>
                  <div className="uv-input-group span-full">
                    <label className="uv-label">Description <span className="required-star">*</span></label>
                    <textarea className="uv-input uv-textarea" placeholder="Led a team of 5 engineers building..." required value={exp.description} onChange={e => updateExperience(i, 'description', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="uv-btn uv-btn--outline add-btn" onClick={addExperience}>
              <Plus size={16} /> Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Education */}
      <div className="uv-card form-section">
        <SectionHeader id="education" icon={GraduationCap} title="Education" />
        {openSections.education && (
          <div className="dynamic-section">
            {data.education.map((edu, i) => (
              <div key={i} className="dynamic-item">
                <div className="dynamic-item__header">
                  <span className="dynamic-item__number">{i + 1}</span>
                  {data.education.length > 1 && (
                    <button type="button" className="uv-btn uv-btn--danger uv-btn--sm" onClick={() => removeEducation(i)}>
                      <Trash2 size={14} /> Remove
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="uv-input-group">
                    <label className="uv-label">Institution <span className="required-star">*</span></label>
                    <input className="uv-input" type="text" placeholder="Stanford University" required value={edu.institution} onChange={e => updateEducation(i, 'institution', e.target.value)} />
                  </div>
                  <div className="uv-input-group">
                    <label className="uv-label">Degree <span className="required-star">*</span></label>
                    <input className="uv-input" type="text" placeholder="Bachelor of Science" required value={edu.degree} onChange={e => updateEducation(i, 'degree', e.target.value)} />
                  </div>
                  <div className="uv-input-group">
                    <label className="uv-label">Field of Study <span className="required-star">*</span></label>
                    <input className="uv-input" type="text" placeholder="Computer Science" required value={edu.field} onChange={e => updateEducation(i, 'field', e.target.value)} />
                  </div>
                  <div className="uv-input-group">
                    <label className="uv-label">Start Date <span className="required-star">*</span></label>
                    <input className="uv-input" type="month" required value={edu.startDate} onChange={e => updateEducation(i, 'startDate', e.target.value)} />
                  </div>
                  <div className="uv-input-group">
                    <label className="uv-label">End Date</label>
                    <input className="uv-input" type="month" value={edu.endDate} onChange={e => updateEducation(i, 'endDate', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="uv-btn uv-btn--outline add-btn" onClick={addEducation}>
              <Plus size={16} /> Add Education
            </button>
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="uv-card form-section">
        <SectionHeader id="projects" icon={FolderGit2} title="Projects" />
        {openSections.projects && (
          <div className="dynamic-section">
            {data.projects.map((proj, i) => (
              <div key={i} className="dynamic-item">
                <div className="dynamic-item__header">
                  <span className="dynamic-item__number">{i + 1}</span>
                  {data.projects.length > 1 && (
                    <button type="button" className="uv-btn uv-btn--danger uv-btn--sm" onClick={() => removeProject(i)}>
                      <Trash2 size={14} /> Remove
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <div className="uv-input-group">
                    <label className="uv-label">Project Name <span className="required-star">*</span></label>
                    <input className="uv-input" type="text" placeholder="E-commerce Platform" required value={proj.name} onChange={e => updateProject(i, 'name', e.target.value)} />
                  </div>
                  <div className="uv-input-group">
                    <label className="uv-label">Link</label>
                    <input className="uv-input" type="url" placeholder="https://github.com/user/project" value={proj.link} onChange={e => updateProject(i, 'link', e.target.value)} />
                  </div>
                  <div className="uv-input-group span-full">
                    <label className="uv-label">Tech Stack</label>
                    <input className="uv-input" type="text" placeholder="React, Node.js, MongoDB" value={proj.techStack} onChange={e => updateProject(i, 'techStack', e.target.value)} />
                  </div>
                  <div className="uv-input-group span-full">
                    <label className="uv-label">Description <span className="required-star">*</span></label>
                    <textarea className="uv-input uv-textarea" placeholder="Built a full-stack e-commerce platform with payment integration..." required value={proj.description} onChange={e => updateProject(i, 'description', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="uv-btn uv-btn--outline add-btn" onClick={addProject}>
              <Plus size={16} /> Add Project
            </button>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="uv-card form-section">
        <SectionHeader id="skills" icon={Wrench} title="Skills" />
        {openSections.skills && (
          <div className="uv-input-group">
            <label className="uv-label" htmlFor="skills">Skills <span className="required-star">*</span></label>
            <textarea id="skills" className="uv-input uv-textarea" placeholder="JavaScript, React, Node.js, Python, SQL, Git..." required value={data.skills} onChange={e => updateSkills(e.target.value)} />
            <span className="input-hint">Separate skills with commas</span>
          </div>
        )}
      </div>
    </div>
  );
}
