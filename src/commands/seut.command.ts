import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import r from "../reddit";
import { postToEmbed } from "../utils/reddit";
export const data = new SlashCommandBuilder()
    .setName("seut")
    .setDescription("Posts a random cute picture from the r/seut subreddit.");

export async function execute(interaction:ChatInputCommandInteraction) {
    await interaction.deferReply();
    // @ts-ignore
    const subreddit = await r.getSubreddit("seut");
    let count = 0;
    let post = await subreddit.getRandomSubmission();
    while ((post.over_18 ||post.is_video)&& count < 10) {
        post = await subreddit.getRandomSubmission();
        count++;
    }
    if (count >= 10) {
        await interaction.reply({ content: "Could not find a suitable post.", ephemeral: true });
        return;
    }
    await interaction.editReply({ embeds: [await postToEmbed(post)] });
}

