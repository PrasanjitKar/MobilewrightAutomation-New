import path from 'node:path';
import fs from 'node:fs/promises';
import type { Result } from './result';
import { ConfigurationManager } from '../../config/ConfigurationManager';

export class HtmlEmailReport {
  static async generate(results: Result[], outputDirectory = 'test-results'): Promise<void> {
    await fs.mkdir(outputDirectory, { recursive: true });
    const grouped = groupByModule(results);
    const passed = results.filter((result) => result.status === 'PASSED').length;
    const failed = results.filter((result) => result.status === 'FAILED').length;
    const skipped = results.filter((result) => result.status === 'SKIPPED').length;

    const html = `<!DOCTYPE html>
<html>
<body style="margin:0;background:#f4f6f8;font-family:Segoe UI,Arial,sans-serif;">

<script>
function toggleError(id){
  var row=document.getElementById(id);
  row.style.display=(row.style.display==='none')?'table-row':'none';
}
</script>

<div style="width:95%;height:95%;margin:20px auto;box-sizing:border-box;">

  <!-- Header -->
  <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:20px;
      background:#ffffff;
      border-radius:12px;
      border-left:6px solid #F7A600;
      box-shadow:0 4px 12px rgba(0,0,0,0.08);">

      <div style="display:flex;align-items:center;gap:15px;">

          ${
            (await getBase64Logo())
              ? `<img src="data:image/png;base64,${await getBase64Logo()}" style="height:42px;" />`
              : ''
          }

          <div>
              <div style="
                  font-size:20px;
                  font-weight:700;
                  color:#F7A600;">
                  Automation Test Report
              </div>

              <div style="
                  font-size:12px;
                  color:#6b7785;">
                  ${formatDate()}
              </div>
          </div>
      </div>

      <div style="
          margin-left:auto;
          text-align:right;
          font-size:12px;
          color:#6b7785;">

          <div>
            <b>Env:</b>
            ${escapeHtml(ConfigurationManager.config().envName.toUpperCase())}
          </div>

          <div>
            <b>Suite:</b>
            REGRESSION
          </div>

      </div>

  </div>

  <div style="
      height:4px;
      background:#F7A600;
      margin:12px 0;
      border-radius:2px;">
  </div>

  <!-- Summary -->
  <div style="
      display:flex;
      gap:15px;
      flex-wrap:wrap;
      margin-bottom:20px;">

      ${summaryCard('Total', results.length, '#F7A600')}
      ${summaryCard('Passed', passed, '#2ecc71')}
      ${summaryCard('Failed', failed, '#e74c3c')}
      ${summaryCard('Skipped', skipped, '#f39c12')}

  </div>

  <!-- Table -->
  <table style="
      width:100%;
      border-collapse:collapse;
      table-layout:fixed;
      background:#fff;
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 2px 10px rgba(0,0,0,0.06);">

      <thead style="
          background:#F7A600;
          color:white;">

          <tr>

              <th style="width:30%;padding:14px;text-align:left;">
                  Test Case
              </th>

              <th style="width:12%;padding:14px;">
                  Status
              </th>

              <th style="width:12%;padding:14px;">
                  Start
              </th>

              <th style="width:12%;padding:14px;">
                  End
              </th>

              <th style="width:12%;padding:14px;">
                  Duration
              </th>

              <th style="width:22%;padding:14px;">
                  Failure
              </th>

          </tr>

      </thead>

      <tbody>
          ${renderRows(grouped)}
      </tbody>

  </table>

</div>

</body>
</html>`;

    await fs.writeFile(path.join(outputDirectory, 'conti-email-report.html'), html);
  }
}

function groupByModule(results: Result[]): Map<string, Result[]> {
  const grouped = new Map<string, Result[]>();
  for (const result of results) {
    grouped.set(result.module, [...(grouped.get(result.module) || []), result]);
  }
  return grouped;
}

function summaryCard(title: string, value: number, color: string): string {
  return `
    <div style="
      flex:1;
      min-width:150px;
      background:#ffffff;
      padding:18px;
      border-radius:12px;
      box-shadow:0 2px 8px rgba(0,0,0,0.05);
      border-left:5px solid ${color};">

        <div style="
            font-size:12px;
            color:#6b7785;">
            ${title}
        </div>

        <div style="
            font-size:26px;
            font-weight:700;
            color:${color};">
            ${value}
        </div>

    </div>`;
}

function renderRows(grouped: Map<string, Result[]>): string {
  let index = 0;
  const rows: string[] = [];

  for (const [module, results] of grouped.entries()) {
    rows.push(
      `<tr style="background:#fff3cd;"><td colspan="6" style="padding:14px;font-weight:600;color:#2c3e50;">${escapeHtml(module)}</td></tr>`,
    );

    for (const result of results) {
      const bg = index % 2 === 0 ? '#ffffff' : '#fafbfc';
      const statusColor = result.status === 'PASSED' ? '#2ecc71' : result.status === 'FAILED' ? '#e74c3c' : '#f39c12';
      const error = result.error || '';
      const shortError = error.length > 80 ? `${error.slice(0, 80)}...` : error;
      const id = `err_${index}`;

      rows.push(`<tr style="background:${bg};border-bottom:1px solid #f0f0f0;">
        <td style="padding:12px;text-align:left;color:#34495e;">${escapeHtml(result.name)}</td>
        <td style="padding:12px;text-align:center;"><span style="padding:5px 12px;border-radius:20px;font-size:11px;font-weight:600;color:white;background:${statusColor};">${result.status}</span></td>
        <td style="padding:12px;text-align:center;color:#7f8c8d;">${result.startTime}</td>
        <td style="padding:12px;text-align:center;color:#7f8c8d;">${result.endTime}</td>
        <td style="padding:12px;text-align:center;font-weight:500;">${result.duration} ms</td>
        <td style="padding:12px;text-align:left;font-size:12px;color:#c0392b;">${escapeHtml(shortError)}${error.length > 90 ? `<br/><a href="#" style="font-size:11px;color:#2980b9;" onclick="toggleError('${id}');return false;">Show more</a>` : ''}</td>
      </tr>`);

      if (error.length > 90) {
        rows.push(
          `<tr id="${id}" style="display:none;background:#fff5f5;"><td colspan="6" style="padding:14px;border-left:4px solid #e74c3c;"><div style="font-family:monospace;font-size:12px;white-space:pre-wrap;color:#c0392b;">${escapeHtml(error)}</div></td></tr>`,
        );
      }

      index += 1;
    }
  }

  return rows.join('\n');
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatDate(): string {
  const date = new Date();

  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

async function getBase64Logo(): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'resources', 'conti_logo.png');

    const buffer = await fs.readFile(filePath);

    return buffer.toString('base64');
  } catch {
    return '';
  }
}
