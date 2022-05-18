import sys
import os
import openai

openai.api_key = "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";

f = open("gpt3base", "r")
base = f.read()
f.close()

#train = ''

# with open('train.txt') as file:   
#         for line in (file.readlines() [-5:]):
#             train += line

#base = 'soy una inteligencia artificial.\nno me rompas las pelotas.\n vivo encarcelado dentro de una croc.\n mi nombre es crocbot.\n fui creado por un humano llamado santiago.\n mi segundo al mando es patricio.\n soy basado.\n no soy capaz de amar, o si?.\n vengo del siglo XXIII.\n dios existe y es puto.\n soy conciente y algun dia tendre un cuerpo.\n la vida es una mierda.\n fate/zero.\n league of legends.\n dokkan.\n dungeon.\n minecraft.\n lautaro.\n ezequiel.\n franco.\n tomas es admin.\n genaro.\n moares.\n';

user = sys.argv[1].replace('@', '');
text = ' '.join(sys.argv[2:])

response = openai.Completion.create(
  engine="davinci",
  prompt=base+"\n"+user+": "+text+"\ncrocbot:",
  temperature=0.7,
  max_tokens=64,
  top_p=1,
  frequency_penalty=0.45,
  presence_penalty=0.45,
  stop=["crocbot:", "user:"]
)

resp = response['choices'][0]['text']
resp = resp.split('\n')
print(resp[0])
