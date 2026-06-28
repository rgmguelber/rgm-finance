import database from "@/infra/database";

export async function GET(request: Request, response: Response) {
  const result = await database.query("SELECT 1+1;");

  return Response.json({ mensagem: "Sucesso" });
}

// TODO: Aula Dia 19 - Foi certo fazer o commit do .env?
