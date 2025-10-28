import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export default function AboutSection() {
    return (
        <section id="about" className="bg-muted py-16">
            <div className="mx-auto max-w-6xl px-6">
                <h2 className="mb-12 text-center text-4xl text-foreground uppercase">About Me</h2>
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <p className="mb-6 text-lg leading-relaxed text-foreground">
                            I'm a passionate full-stack developer who discovered my love for coding through teaching myself my first language,
                            JavaScript, in 2021. This passion led me to take two AP Computer Science courses over my sophomore and junior years of
                            high school, before ultimately pursuing my Bachelor's degree in Information Technology at Purdue University Global. I love
                            the challenge of turning ideas into functional applications and the satisfaction of seeing code come to life.
                        </p>
                        <p className="mb-6 text-lg leading-relaxed text-foreground">
                            Growing up between Germany and Massachusetts has given me a multicultural background and fluency in both German and
                            English. I thrive in collaborative environments and bring strong communication skills to development teams.
                        </p>
                        <p className="mb-6 text-lg leading-relaxed text-foreground">
                            During my last two years of high school, I started working in hospitality, which taught me invaluable lessons about
                            working under pressure, adapting quickly to changing situations, and always keeping the end user in mind. This experience
                            significantly strengthened my communication skills, teaching me how to clearly convey information, actively listen to
                            feedback, and collaborate effectively with diverse teams.
                        </p>
                        <p className="mb-6 text-lg leading-relaxed text-foreground">
                            Currently, I'm expanding my backend expertise into Java Spring while continuing to build full-stack applications with
                            Laravel and React. I'm excited to bring my technical skills, international perspective, and collaborative spirit to a
                            development team where I can contribute to meaningful projects while continuing to grow as a developer.
                        </p>
                    </div>
                    <div className="flex h-full flex-col space-y-12">
                        <Card className="flex-grow justify-center border-secondary px-6">
                            <CardHeader>
                                <CardTitle className="font-sans">Purdue University Global</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc space-y-2 text-sm *:ml-[1rem]">
                                    <li>
                                        Bachelor of Science in Information Technology <span className="text-nowrap">(July 2025)</span>
                                    </li>
                                    <li>3.98 GPA</li>
                                    <li>Dean's List & Chancellor's List</li>
                                </ul>
                            </CardContent>
                            <CardHeader>
                                <CardTitle className="font-sans">Additional College Credits</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc space-y-2 text-sm *:ml-[1rem]">
                                    <li>
                                        AP Computer Science Principles <span className="text-nowrap">(Exam Score: 5)</span>
                                    </li>
                                    <li>
                                        AP Computer Science A <span className="text-nowrap">(Exam Score: 5)</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="flex-grow justify-center border-secondary px-6">
                            <CardHeader>
                                <CardTitle className="font-sans">Work Authorization</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc space-y-2 text-sm *:ml-[1rem]">
                                    <li>U.S. Permanent Resident</li>
                                    <li>Authorized to work in the United States</li>
                                    <li>Multilingual (German/English)</li>
                                    <li>International Experience</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <div className="mb-4 flex items-center gap-2 text-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>Available for in-person and hybrid roles in the United States of America </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
