/**
 * Şu an /api/contact ve /api/membership kullanmıyor; kayıtlar yalnızca veritabanında.
 * Sheet’i tekrar açarken bu modülü route’lardan çağırın.
 */
import { google } from "googleapis";

type ServiceAccountCreds = {
  client_email: string;
  private_key: string;
};

function parseServiceAccountJson(): ServiceAccountCreds | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (!raw) return null;
  try {
    const j = JSON.parse(raw) as {
      client_email?: string;
      private_key?: string;
    };
    if (!j.client_email || !j.private_key) return null;
    const private_key = j.private_key.replace(/\\n/g, "\n");
    return { client_email: j.client_email, private_key };
  } catch {
    return null;
  }
}

export function isGoogleSheetsConfigured(): boolean {
  const id = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  return Boolean(id && parseServiceAccountJson());
}

async function getSheetsClient() {
  const sa = parseServiceAccountJson();
  if (!sa) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON eksik veya geçersiz");
  const auth = new google.auth.JWT({
    email: sa.client_email,
    key: sa.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

export async function appendSheetRow(
  tabName: string,
  row: (string | number | null | undefined)[],
): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID tanımlı değil");
  }
  const sheets = await getSheetsClient();
  const range = `'${tabName.replace(/'/g, "''")}'!A:Z`;
  const values = [row.map((c) => (c == null ? "" : String(c)))];
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });
}
