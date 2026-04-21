import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStorageService } from '../../shared/services/form.service';
import { SubmittedFormData } from '../../shared/models/form.model';

/**
 * Submissions Component
 * Displays all form submissions saved to local storage
 * Allows filtering by form type and viewing submission details
 */
@Component({
  selector: 'app-submissions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.css',
})
export class SubmissionsComponent implements OnInit {
  submissions: SubmittedFormData[] = [];
  filteredSubmissions: SubmittedFormData[] = [];
  selectedFilter: 'all' | 'template-driven' | 'reactive' = 'all';
  expandedIndex: number | null = null;

  constructor(private formStorageService: FormStorageService) {}

  ngOnInit(): void {
    this.loadSubmissions();
  }

  /**
   * Load all submissions from service
   */
  loadSubmissions(): void {
    this.submissions = this.formStorageService.getSubmittedForms();
    this.filterSubmissions();
  }

  /**
   * Filter submissions by type
   */
  filterSubmissions(): void {
    if (this.selectedFilter === 'all') {
      this.filteredSubmissions = this.submissions;
    } else {
      this.filteredSubmissions = this.submissions.filter(
        (submission) => submission.formType === this.selectedFilter
      );
    }
  }

  /**
   * Get count of template-driven forms
   */
  getTemplateFormsCount(): number {
    return this.submissions.filter((s) => s.formType === 'template-driven').length;
  }

  /**
   * Get count of reactive forms
   */
  getReactiveFormsCount(): number {
    return this.submissions.filter((s) => s.formType === 'reactive').length;
  }

  /**
   * Get count of valid forms
   */
  getValidFormsCount(): number {
    return this.submissions.filter((s) => s.isValid).length;
  }

  /**
   * Change filter and update view
   */
  onFilterChange(filter: 'all' | 'template-driven' | 'reactive'): void {
    this.selectedFilter = filter;
    this.filterSubmissions();
  }

  /**
   * Toggle row expansion to show full details
   */
  toggleExpand(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  /**
   * Clear all submissions
   */
  clearAll(): void {
    if (confirm('Are you sure you want to delete all submissions?')) {
      this.formStorageService.clearSubmissions();
      this.loadSubmissions();
    }
  }

  /**
   * Format date for display
   */
  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  /**
   * Format data object for display
   */
  formatData(data: any): string {
    if (typeof data === 'string') {
      return data;
    }
    if (typeof data === 'object') {
      if (Array.isArray(data)) {
        return data.join(', ');
      }
      return JSON.stringify(data, null, 2);
    }
    return String(data);
  }

  /**
   * Get badge color based on form type
   */
  getFormTypeBadge(formType: string): string {
    return formType === 'template-driven' ? 'bg-primary' : 'bg-success';
  }

  /**
   * Get badge color based on validity
   */
  getValidityBadge(isValid: boolean): string {
    return isValid ? 'bg-success' : 'bg-danger';
  }
}
