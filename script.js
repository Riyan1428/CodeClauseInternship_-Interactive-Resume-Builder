// State management
let resumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: []
};

// DOM Elements
const editTab = document.getElementById('editTab');
const previewTab = document.getElementById('previewTab');
const editPanel = document.getElementById('editPanel');
const previewPanel = document.getElementById('previewPanel');
const exportBtn = document.getElementById('exportBtn');
const resumeForm = document.getElementById('resumeForm');
const experienceList = document.getElementById('experienceList');
const educationList = document.getElementById('educationList');
const skillsList = document.getElementById('skillsList');

// Event Listeners
editTab.addEventListener('click', () => switchTab('edit'));
previewTab.addEventListener('click', () => switchTab('preview'));
exportBtn.addEventListener('click', exportPDF);

document.getElementById('addExperience').addEventListener('click', addExperience);
document.getElementById('addEducation').addEventListener('click', addEducation);
document.getElementById('addSkill').addEventListener('click', addSkill);

// Form input listeners
const personalInfoInputs = ['name', 'email', 'phone', 'location', 'summary'];
personalInfoInputs.forEach(field => {
  document.getElementById(field).addEventListener('input', (e) => {
    resumeData.personalInfo[field] = e.target.value;
    updatePreview();
  });
});

// Tab switching
function switchTab(tab) {
  if (tab === 'edit') {
    editTab.classList.add('active');
    previewTab.classList.remove('active');
    editPanel.classList.remove('hidden');
    previewPanel.classList.add('hidden');
  } else {
    editTab.classList.remove('active');
    previewTab.classList.add('active');
    editPanel.classList.add('hidden');
    previewPanel.classList.remove('hidden');
  }
}

// Experience functions
function addExperience() {
  const experience = {
    id: Date.now().toString(),
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  };
  resumeData.experience.push(experience);
  renderExperience(experience);
  updatePreview();
}

function renderExperience(experience) {
  const div = document.createElement('div');
  div.className = 'form-section';
  div.dataset.id = experience.id;

  div.innerHTML = `
    <div class="grid-2">
      <div class="input-group">
        <input type="text" placeholder="Company" value="${experience.company}" 
               onInput="updateExperience('${experience.id}', 'company', this.value)">
      </div>
      <div class="input-group">
        <input type="text" placeholder="Position" value="${experience.position}"
               onInput="updateExperience('${experience.id}', 'position', this.value)">
      </div>
      <div class="input-group">
        <input type="month" placeholder="Start Date" value="${experience.startDate}"
               onInput="updateExperience('${experience.id}', 'startDate', this.value)">
      </div>
      <div class="input-group">
        <input type="month" placeholder="End Date" value="${experience.endDate}"
               onInput="updateExperience('${experience.id}', 'endDate', this.value)">
      </div>
    </div>
    <div class="input-group">
      <textarea placeholder="Description" rows="4"
                onInput="updateExperience('${experience.id}', 'description', this.value)">${experience.description}</textarea>
    </div>
    <button type="button" class="remove-btn" onclick="removeExperience('${experience.id}')">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      </svg>
      Remove
    </button>
  `;

  experienceList.appendChild(div);
}

function updateExperience(id, field, value) {
  const experience = resumeData.experience.find(exp => exp.id === id);
  if (experience) {
    experience[field] = value;
    updatePreview();
  }
}

function removeExperience(id) {
  resumeData.experience = resumeData.experience.filter(exp => exp.id !== id);
  const element = document.querySelector(`[data-id="${id}"]`);
  if (element) element.remove();
  updatePreview();
}

// Education functions
function addEducation() {
  const education = {
    id: Date.now().toString(),
    institution: '',
    degree: '',
    field: '',
    graduationDate: ''
  };
  resumeData.education.push(education);
  renderEducation(education);
  updatePreview();
}

function renderEducation(education) {
  const div = document.createElement('div');
  div.className = 'form-section';
  div.dataset.id = education.id;

  div.innerHTML = `
    <div class="grid-2">
      <div class="input-group">
        <input type="text" placeholder="Institution" value="${education.institution}"
               onInput="updateEducation('${education.id}', 'institution', this.value)">
      </div>
      <div class="input-group">
        <input type="text" placeholder="Degree" value="${education.degree}"
               onInput="updateEducation('${education.id}', 'degree', this.value)">
      </div>
      <div class="input-group">
        <input type="text" placeholder="Field of Study" value="${education.field}"
               onInput="updateEducation('${education.id}', 'field', this.value)">
      </div>
      <div class="input-group">
        <input type="month" placeholder="Graduation Date" value="${education.graduationDate}"
               onInput="updateEducation('${education.id}', 'graduationDate', this.value)">
      </div>
    </div>
    <button type="button" class="remove-btn" onclick="removeEducation('${education.id}')">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      </svg>
      Remove
    </button>
  `;

  educationList.appendChild(div);
}

function updateEducation(id, field, value) {
  const education = resumeData.education.find(edu => edu.id === id);
  if (education) {
    education[field] = value;
    updatePreview();
  }
}

function removeEducation(id) {
  resumeData.education = resumeData.education.filter(edu => edu.id !== id);
  const element = document.querySelector(`[data-id="${id}"]`);
  if (element) element.remove();
  updatePreview();
}

// Skills functions
function addSkill() {
  const skill = '';
  resumeData.skills.push(skill);
  renderSkills();
  updatePreview();
}

function renderSkills() {
  skillsList.innerHTML = '';
  resumeData.skills.forEach((skill, index) => {
    const div = document.createElement('div');
    div.className = 'skill-item';

    div.innerHTML = `
      <input type="text" placeholder="Skill" value="${skill}"
             onInput="updateSkill(${index}, this.value)">
      <button type="button" class="remove-btn" onclick="removeSkill(${index})">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    skillsList.appendChild(div);
  });
}

function updateSkill(index, value) {
  resumeData.skills[index] = value;
  updatePreview();
}

function removeSkill(index) {
  resumeData.skills.splice(index, 1);
  renderSkills();
  updatePreview();
}

// Preview functions
function updatePreview() {
  const preview = document.getElementById('resumePreview');

  preview.innerHTML = `
    <div class="resume-header">
      <h1 class="resume-name">${resumeData.personalInfo.name}</h1>
      <div class="contact-info">
        ${resumeData.personalInfo.email ? `<span>Email: ${resumeData.personalInfo.email}</span>` : ''}
        ${resumeData.personalInfo.phone ? `<span>Phone: ${resumeData.personalInfo.phone}</span>` : ''}
        ${resumeData.personalInfo.location ? `<span>Location: ${resumeData.personalInfo.location}</span>` : ''}
      </div>
      ${resumeData.personalInfo.summary ? `<p class="mt-4">${resumeData.personalInfo.summary}</p>` : ''}
    </div>

    ${resumeData.experience.length > 0 ? `
      <div class="resume-section">
        <h2 class="resume-section-title">Experience</h2>
        ${resumeData.experience.map(exp => `
          <div class="experience-item">
            <div class="item-header">
              <div>
                <div class="item-title">${exp.position}</div>
                <div class="item-subtitle">${exp.company}</div>
              </div>
              <div class="item-date">${exp.startDate} - ${exp.endDate || 'Present'}</div>
            </div>
            <p>${exp.description}</p>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${resumeData.education.length > 0 ? `
      <div class="resume-section">
        <h2 class="resume-section-title">Education</h2>
        ${resumeData.education.map(edu => `
          <div class="education-item">
            <div class="item-header">
              <div>
                <div class="item-title">${edu.institution}</div>
                <div class="item-subtitle">${edu.degree} in ${edu.field}</div>
              </div>
              <div class="item-date">${edu.graduationDate}</div>
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${resumeData.skills.length > 0 ? `
      <div class="resume-section">
        <h2 class="resume-section-title">Skills</h2>
        <div class="skills-preview">
          ${resumeData.skills.map(skill => `
            <span class="skill-tag">${skill}</span>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

function exportPDF() {
  window.print();
}

// Initialize preview
updatePreview();
