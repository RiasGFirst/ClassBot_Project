const {SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder} = require('discord.js');
const fs = require('fs');

module.exports = {
    data: {
        name: 'init-inClassModal'
    },
    async execute(interaction, client) {

        

        const week = interaction.fields.getTextInputValue("inClassTextInputWeek");
        const day = interaction.fields.getTextInputValue("inClassTextInputDay");
        const time = interaction.fields.getTextInputValue("inClassTextInputTime");
        const subject = interaction.fields.getTextInputValue("inClassTextInputSubject");
        const classroom = interaction.fields.getTextInputValue("inClassTextInputClassroom");

        // Open the file timetable.json from the server folder
        const timetable = JSON.parse(fs.readFileSync(`./src/data/${interaction.guild.id}/timetable.json`));

        
        // IF THE DAY IS SATURDAY CHECK IF THE CLASS IS TERMINAL AND THE TIME IS BEETWEEN M1-M4
        if (day.toUpperCase() === "SATURDAY" && timetable.data.class == "terminale") {

            if(time.toUpperCase() == "M1" || time.toUpperCase() == "M2" || time.toUpperCase() == "M3" || time.toUpperCase() == "M4") {

                timetable[week.toUpperCase()][day.toUpperCase()][time.toUpperCase()].type = "inClassWork";
                timetable[week.toUpperCase()][day.toUpperCase()][time.toUpperCase()].inClassWork_Subject = subject;
                timetable[week.toUpperCase()][day.toUpperCase()][time.toUpperCase()].inClassWork_Classroom = classroom;
    
                // Write the new timetable to the file timetable.json
                fs.writeFileSync(`./src/data/${interaction.guild.id}/timetable.json`, JSON.stringify(timetable, null, 4));
    
                // Send a message to the user
                await interaction.update({
                    content: `The work has been added to the timetable for ${week} ${day} ${time}`+"To continue the creation of the timetable, rerun the command ```/setup-timetable```",
                    components: []
                }); 
            }
            


        }

        if(day.toUpperCase() != "SATURDAY" ) {

            // Add the new in class work to the timetable
            timetable[week.toUpperCase()][day.toUpperCase()][time.toUpperCase()].type = "inClassWork";
            timetable[week.toUpperCase()][day.toUpperCase()][time.toUpperCase()].inClassWork_Subject = subject;
            timetable[week.toUpperCase()][day.toUpperCase()][time.toUpperCase()].inClassWork_Classroom = classroom;

            // Write the new timetable to the file timetable.json
            fs.writeFileSync(`./src/data/${interaction.guild.id}/timetable.json`, JSON.stringify(timetable, null, 4));

            // Send a message to the user
            await interaction.update({
                content: `The work has been added to the timetable for ${week} ${day} ${time}`+"\nTo continue the creation of the timetable, rerun the command ```/setup-timetable```",
                components: []
            });
        }
    }
};