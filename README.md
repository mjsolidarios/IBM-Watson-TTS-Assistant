## IBM Watson TTS Assistant

Simple command-line app for converting text to natural speaking (human-like) voices using IBM Watson's deep-learning AI algorithms.

#### Getting Started

Users must create an account on [IBM](https://www.ibm.com/) and use IBM Watson's Text to Speech Service. The conversion service provides free Lite Plan that caters 10,000 characters per month.

Download the IBM credentials file ``ibm-credentials.env`` from your [service page](https://cloud.ibm.com/services/text-to-speech) and save its contents in a ``.env`` file inside this project. 

**Example Usage**

> Synthesizes text, uses a custom voice and automatically playbacks the audio. 

`node index.js speak -t "Programming is not easy, never be afraid to ask for help. Don't give up, and face your coding journey with passion and humility." -p "en-US_OliviaV3Voice"` 

**Available Options**

| Option        | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| --version     | Show version number.                                         |
| -p, --persona | Use a different persona for the voice, the default voice is ``en-US_MichaelV3Voice``.  The following are the available voices: ``ar-AR_OmarVoice,de-DE_BirgitVoice,de-DE_BirgitV3Voice,de-DE_DieterVoice,de-DE_DieterV3Voice,de-DE_ErikaV3Voice,en-GB_CharlotteV3Voice,en-GB_JamesV3Voice,en-GB_KateVoice,en-GB_KateV3Voice,en-US_AllisonVoice,en-US_AllisonV3Voice,en-US_EmilyV3Voice,en-US_HenryV3Voice,en-US_KevinV3Voice,en-US_LisaVoice,en-US_LisaV3Voice,en-US_MichaelVoice,en-US_MichaelV3Voice,en-US_OliviaV3Voice,es-ES_EnriqueVoice,es-ES_EnriqueV3Voice,es-ES_LauraVoice,es-ES_LauraV3Voice,es-LA_SofiaVoice,es-LA_SofiaV3Voice,es-US_SofiaVoice,es-US_SofiaV3Voice,fr-FR_NicolasV3Voice,fr-FR_ReneeVoice,fr-FR_ReneeV3Voice,it-IT_FrancescaVoice,it-IT_FrancescaV3Voice,ja-JP_EmiVoice,ja-JP_EmiV3Voice,ko-KR_YoungmiVoice,ko-KR_YunaVoice,nl-NL_EmmaVoice,nl-NL_LiamVoice,pt-BR_IsabelaVoice,pt-BR_IsabelaV3Voice,zh-CN_LiNaVoice,zh-CN_WangWeiVoice,zh-CN_ZhangJingVoice`` . |
| -t, --text    | Text to convert.                                             |
| -h, --help    | Show help.                                                   |



