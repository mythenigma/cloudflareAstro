---
title: "Replace a PDF Without Changing the Link"
description: "Keep the same shareable link while updating PDF content and settings. No need to resend links or reconfigure access controls. Free, browser-based solution."
pubDate: "Jan 19 2026"
tags: ["PDF", "Link management", "Updates", "Version control"]
---

# Replace a PDF Without Changing the Link

<div class="intro-panel">
  <p>Imagine this: You've already shared a PDF link with a client, then you discover an error that needs fixing. The traditional way is to upload a new file, get a new link, and send it again—which confuses the client: "Which link should I use?"</p>
  <p><strong>MaiPDF's replacement feature:</strong> The link stays the same. You just swap the file in the background. The client continues using the original link, and when they open it, they automatically see the updated version. No need to resend links, no confusion.</p>
  <p class="intro-note">Note: This feature is available in <strong>MaiPDF</strong> only (Maiimg does not support file replacement).</p>
</div>

## 🔄 How It Works

**The reading code stays the same. The content and settings are replaced by the new version.**

![Same link, updated content](/diagram/en/replace-link-redirect-style-b.svg)

![File replacement process](/diagram/en/file-replace-flow.svg)

```mermaid
flowchart TD
    A[📤 Original PDF Shared] --> B[🔗 Link Already in Use]
    B --> C[📄 Need to Update Content/Settings]
    C --> D[🔄 Use Replacement Portal]
    D --> E[📝 Enter Old Codes]
    D --> F[📝 Enter New Codes]
    E --> G[✅ Click Update File]
    F --> G
    G --> H[🔗 Same Link, New Content]
    H --> I[👥 Recipients See Update Automatically]
    
    style A fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style B fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style C fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style D fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style G fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style H fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    style I fill:#f1f8e9,stroke:#558b2f,stroke-width:2px
```

## 🎯 Why Replace Instead of Resending?

<div class="benefits-grid">
  <div class="benefit-card">
    <div class="benefit-icon">🔗</div>
    <div class="benefit-content">
      <h4>Link Stays the Same</h4>
      <p>No need to resend URLs or QR codes. Recipients continue using the original link.</p>
    </div>
  </div>
  <div class="benefit-card">
    <div class="benefit-icon">⚙️</div>
    <div class="benefit-content">
      <h4>Settings Sync Automatically</h4>
      <p>Access controls (view limits, verification, watermarks) follow the new file. No manual reconfiguration.</p>
    </div>
  </div>
  <div class="benefit-card">
    <div class="benefit-icon">📊</div>
    <div class="benefit-content">
      <h4>Access Records Preserved</h4>
      <p>View history and analytics remain intact. You can track who accessed both old and new versions.</p>
    </div>
  </div>
  <div class="benefit-card">
    <div class="benefit-icon">⏱️</div>
    <div class="benefit-content">
      <h4>Instant Updates</h4>
      <p>Changes take effect immediately. Next time someone opens the link, they see the new content.</p>
    </div>
  </div>
</div>

## 📋 Common Use Cases

<div class="use-cases-grid">
  <div class="use-case-card">
    <h4>📝 Fix Mistakes After Sharing</h4>
    <p>Found a typo or error in a contract? Replace the file without notifying everyone about a new link.</p>
  </div>
  <div class="use-case-card">
    <h4>💰 Update Pricing or Versions</h4>
    <p>Price lists, product catalogs, or versioned documents can be updated seamlessly.</p>
  </div>
  <div class="use-case-card">
    <h4>⚙️ Change Access Settings</h4>
    <p>Need to adjust view limits, add email verification, enable watermarks, or modify download permissions? Replace with a new file that has updated settings.</p>
  </div>
  <div class="use-case-card">
    <h4>🚫 Retract Content</h4>
    <p>Need to temporarily remove access? Upload a blank PDF, then replace the original link with it. Recipients see a blank page instead of the content.</p>
  </div>
</div>

## 🛠️ How to Replace a PDF (Simple Steps)

On the [replacement portal](https://maipdf.com/pdf/hahachange.php):

1. Enter **old reading code + old control code**
2. Enter **new reading code + new control code**
3. Click **Update File**: The old reading code stays the same, but content and settings are replaced by the new link's version.

```mermaid
flowchart TD
  A[Old link already shared] --> B[Open replacement portal]
  B --> C[Enter old reading code + control code]
  B --> D[Enter new reading code + control code]
  D --> E[Click Update File]
  E --> F[Old reading code stays]
  F --> G[Content & settings replaced]
```

**What gets replaced:**
- ✅ PDF file content
- ✅ All access settings (view limits, time limits, verification, download permissions, watermarks, alert emails)

**What stays the same:**
- ✅ Reading code (the shareable link)
- ✅ QR code (if already generated)
- ✅ Access history and analytics (preserved for tracking)

## 📋 Common Use Cases

- **Contract revisions:** Update terms without sending new links
- **Price list updates:** Keep the same link, update pricing
- **Training materials:** Iterate on content without confusion
- **Change settings:** Update verification, watermarks, alert emails, etc.
- **Retract content:** Upload a blank PDF first, then replace the original link with it

## 🔍 Example Scenario

<div class="scenario-intro">
  <p><strong>Situation:</strong> You shared a contract PDF with a client. After sending, you notice a pricing error that needs immediate correction.</p>
</div>

<div class="scenario-comparison">
  <div class="scenario-column scenario-bad">
    <div class="scenario-header">
      <div class="scenario-icon">❌</div>
      <h3>Without Replacement</h3>
    </div>
    <div class="scenario-steps">
      <div class="scenario-step">
        <div class="step-badge">1</div>
        <div class="step-content">
          <strong>Upload new PDF</strong>
          <p>Get a completely new link</p>
        </div>
      </div>
      <div class="scenario-step">
        <div class="step-badge">2</div>
        <div class="step-content">
          <strong>Reconfigure settings</strong>
          <p>Manually set view limits, verification, watermarks, etc.</p>
        </div>
      </div>
      <div class="scenario-step">
        <div class="step-badge">3</div>
        <div class="step-content">
          <strong>Send new link</strong>
          <p>Notify client about the update</p>
        </div>
      </div>
      <div class="scenario-step">
        <div class="step-badge">4</div>
        <div class="step-content">
          <strong>Client confusion</strong>
          <p>"Which link should I use?"</p>
        </div>
      </div>
      <div class="scenario-step">
        <div class="step-badge">5</div>
        <div class="step-content">
          <strong>Risk of error</strong>
          <p>Client might use old link with wrong pricing</p>
        </div>
      </div>
    </div>
    <div class="scenario-result bad-result">
      <p>⚠️ Time-consuming, error-prone, and confusing</p>
    </div>
  </div>

  <div class="scenario-column scenario-good">
    <div class="scenario-header">
      <div class="scenario-icon">✅</div>
      <h3>With MaiPDF Replacement</h3>
    </div>
    <div class="scenario-steps">
      <div class="scenario-step">
        <div class="step-badge">1</div>
        <div class="step-content">
          <strong>Upload corrected PDF</strong>
          <p>With same settings as original</p>
        </div>
      </div>
      <div class="scenario-step">
        <div class="step-badge">2</div>
        <div class="step-content">
          <strong>Use replacement portal</strong>
          <p>Swap files in seconds</p>
        </div>
      </div>
      <div class="scenario-step">
        <div class="step-badge">3</div>
        <div class="step-content">
          <strong>Original link updated</strong>
          <p>Same URL now shows corrected version</p>
        </div>
      </div>
      <div class="scenario-step">
        <div class="step-badge">4</div>
        <div class="step-content">
          <strong>Client continues normally</strong>
          <p>Uses the same link they already have</p>
        </div>
      </div>
      <div class="scenario-step">
        <div class="step-badge">5</div>
        <div class="step-content">
          <strong>Zero confusion</strong>
          <p>No risk of using wrong version</p>
        </div>
      </div>
    </div>
    <div class="scenario-result good-result">
      <p>✨ Fast, seamless, and error-free</p>
    </div>
  </div>
</div>

## 💡 Tips for Effective Replacement

<div class="tips-grid">
  <div class="tip-card">
    <div class="tip-icon">📋</div>
    <h4>Plan Ahead</h4>
    <p>If you know you'll need updates, keep your control codes handy. Store them in a secure note or password manager.</p>
  </div>
  <div class="tip-card">
    <div class="tip-icon">🧪</div>
    <h4>Test First</h4>
    <p>Upload the new PDF separately first. Verify all settings work correctly before replacing the shared link.</p>
  </div>
  <div class="tip-card">
    <div class="tip-icon">📝</div>
    <h4>Version Notes</h4>
    <p>For important documents, add a version number or date in the PDF itself so recipients know it's been updated.</p>
  </div>
  <div class="tip-card">
    <div class="tip-icon">🔒</div>
    <h4>Security</h4>
    <p>Control codes are sensitive. Don't share them publicly. Only use them in the replacement portal.</p>
  </div>
</div>

## ❓ Frequently Asked Questions

<div class="faq-section">
  <div class="faq-item">
    <h4>Q: Will recipients know the file was replaced?</h4>
    <p>A: Not automatically. They'll see the new content when they open the link, but won't get a notification. If it's important, you may want to inform them separately.</p>
  </div>
  
  <div class="faq-item">
    <h4>Q: Can I revert to the old file?</h4>
    <p>A: Yes, if you still have the old control code. Simply use the replacement portal again to swap back.</p>
  </div>
  
  <div class="faq-item">
    <h4>Q: What if I lose my control codes?</h4>
    <p>A: Control codes are shown only once after upload. If lost, you cannot replace the file. Always save them securely.</p>
  </div>
  
  <div class="faq-item">
    <h4>Q: Does this work for Maiimg (image sharing)?</h4>
    <p>A: No. File replacement is a MaiPDF-only feature. Maiimg does not support replacing images while keeping the same link.</p>
  </div>
  
  <div class="faq-item">
    <h4>Q: Is there a limit on how many times I can replace?</h4>
    <p>A: No. You can replace files as many times as needed, as long as you have the correct codes.</p>
  </div>
</div>

<style>
  /* Base styles */
  .intro-panel {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2.5rem;
    border-radius: 1rem;
    margin: 2rem 0 3rem;
    font-size: 1.1rem;
    line-height: 1.8;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    position: relative;
    overflow: hidden;
  }
  
  .intro-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  
  .intro-panel p {
    position: relative;
    z-index: 1;
    margin: 0.75rem 0;
  }
  
  .intro-panel p:first-child {
    margin-top: 0;
  }
  
  .intro-panel strong {
    font-weight: 600;
  }
  
  .intro-note {
    margin-top: 1rem !important;
    font-size: 0.95rem;
    opacity: 0.9;
  }
  
  /* Benefits Grid */
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 3rem 0;
  }
  
  .benefit-card {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 1rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .benefit-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  .benefit-icon {
    font-size: 2rem;
    flex-shrink: 0;
    line-height: 1;
  }
  
  .benefit-content h4 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .benefit-content p {
    margin: 0;
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  /* Use Cases Grid */
  .use-cases-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 3rem 0;
  }
  
  .use-case-card {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-left: 4px solid #3b82f6;
    border-radius: 0.5rem;
    padding: 1.5rem;
    transition: transform 0.2s ease;
  }
  
  .use-case-card:hover {
    transform: translateX(5px);
  }
  
  .use-case-card h4 {
    margin: 0 0 0.75rem 0;
    color: #1e293b;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .use-case-card p {
    margin: 0;
    color: #475569;
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  /* Steps Timeline */
  .steps-timeline {
    margin: 3rem 0;
    position: relative;
    padding-left: 2rem;
  }
  
  .steps-timeline::before {
    content: '';
    position: absolute;
    left: 1rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%);
  }
  
  .step-item {
    position: relative;
    margin-bottom: 2.5rem;
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-left: 2rem;
  }
  
  .step-item:last-child {
    margin-bottom: 0;
  }
  
  .step-number {
    position: absolute;
    left: -3rem;
    top: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.1rem;
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
  }
  
  .step-content h3 {
    margin: 0 0 0.75rem 0;
    color: #1e293b;
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  .step-content p {
    margin: 0.5rem 0;
    color: #475569;
    line-height: 1.6;
  }
  
  .step-content a {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
  }
  
  .step-content a:hover {
    text-decoration: underline;
  }
  
  .step-note {
    font-size: 0.9rem;
    color: #64748b;
    font-style: italic;
    margin-top: 0.5rem !important;
  }
  
  /* Notes Box */
  .notes-box {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    border-left: 4px solid #f59e0b;
    border-radius: 0.5rem;
    padding: 2rem;
    margin: 3rem 0;
  }
  
  .notes-box h4 {
    margin: 0 0 1rem 0;
    color: #92400e;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .notes-box h4:not(:first-child) {
    margin-top: 1.5rem;
  }
  
  .notes-box ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    color: #78350f;
  }
  
  .notes-box li {
    margin: 0.5rem 0;
    line-height: 1.6;
  }
  
  /* Tips Grid */
  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 3rem 0;
  }
  
  .tip-card {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease;
  }
  
  .tip-card:hover {
    transform: translateY(-5px);
  }
  
  .tip-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .tip-card h4 {
    margin: 0 0 0.75rem 0;
    color: #1e293b;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .tip-card p {
    margin: 0;
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  /* FAQ Section */
  .faq-section {
    margin: 3rem 0;
  }
  
  .faq-item {
    background: white;
    border-left: 4px solid #6366f1;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .faq-item h4 {
    margin: 0 0 0.75rem 0;
    color: #1e293b;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .faq-item p {
    margin: 0;
    color: #475569;
    line-height: 1.6;
  }
  
  /* Scenario Section */
  .scenario-intro {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-left: 4px solid #0ea5e9;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin: 3rem 0 2rem;
  }
  
  .scenario-intro p {
    margin: 0;
    color: #0c4a6e;
    font-size: 1.05rem;
    line-height: 1.6;
  }
  
  .scenario-intro strong {
    color: #0369a1;
    font-weight: 600;
  }
  
  .scenario-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 2rem 0 3rem;
  }
  
  .scenario-column {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .scenario-column:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  .scenario-bad {
    border-top: 4px solid #ef4444;
  }
  
  .scenario-good {
    border-top: 4px solid #10b981;
  }
  
  .scenario-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .scenario-icon {
    font-size: 2rem;
    line-height: 1;
  }
  
  .scenario-header h3 {
    margin: 0;
    color: #1e293b;
    font-size: 1.3rem;
    font-weight: 700;
  }
  
  .scenario-steps {
    margin: 1.5rem 0;
  }
  
  .scenario-step {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.25rem;
    align-items: flex-start;
  }
  
  .scenario-step:last-child {
    margin-bottom: 0;
  }
  
  .step-badge {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.9rem;
    color: white;
  }
  
  .scenario-bad .step-badge {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }
  
  .scenario-good .step-badge {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }
  
  .step-content {
    flex: 1;
    padding-top: 0.25rem;
  }
  
  .step-content strong {
    display: block;
    color: #1e293b;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .step-content p {
    margin: 0;
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .scenario-result {
    margin-top: 1.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
    font-weight: 600;
  }
  
  .bad-result {
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    color: #991b1b;
    border: 1px solid #fecaca;
  }
  
  .good-result {
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    color: #166534;
    border: 1px solid #bbf7d0;
  }
  
  .scenario-result p {
    margin: 0;
    font-size: 1rem;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .intro-panel {
      padding: 1.5rem;
      font-size: 1rem;
    }
    
    .benefits-grid,
    .use-cases-grid,
    .tips-grid {
      grid-template-columns: 1fr;
    }
    
    .steps-timeline {
      padding-left: 1.5rem;
    }
    
    .step-item {
      margin-left: 1.5rem;
    }
    
    .step-number {
      left: -2.25rem;
      width: 2rem;
      height: 2rem;
      font-size: 1rem;
    }
    
    .scenario-comparison {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .scenario-column {
      padding: 1.5rem;
    }
  }
</style>
